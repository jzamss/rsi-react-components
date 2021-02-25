import io from "socket.io-client";

const CHANNEL = "/gdx";

const isRemote = (serviceName) => {
  return serviceName.indexOf(":") > 0;
};

/*========================================================
*
* SYNC CALL SUPPORT
*
========================================================*/
const findLocalService = ({ serviceName, connection, module, debug }) => {
  return LocalProxy(serviceName, connection, module);
};

const findRemoteService = (name, connection, module) => {
  const idx = name.indexOf(":");
  const channel = name.substring(0, idx);
  const serviceName = name.substring(idx + 1);
  return RemoteProxy(serviceName, channel, connection, module);
};

const LocalProxy = (name, connection, module) => {
  const invoke = (action, args, handler, ...rest) => {
    const data = {
      service: { module, connection, name, action },
      args: args ? [args] : null,
    };

    const urlaction = "/filipizen/service/invoke";

    fetch(urlaction, {
      method: "POST",
      cache: "no-cache",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          handler(data.error, null);
        } else {
          if (!Array.isArray(data) && Object.keys(data).length === 0) {
            //treat EMPTY data as null (from server)
            handler(null, null);
          }
          if (!Array.isArray(data) && data.status === "ERROR") {
            handler(data.msg, null);
          } else {
            handler(null, data);
          }
        }
      })
      .catch((err) => handler(err.toString(), null));
  };
  return { invoke };
};

const RemoteProxy = (name, channel, connection, module) => {
  const socket = io(CHANNEL);
  socket.connect();

  const asyncFetch = async (method, args) => {
    const promise = new Promise((resolve, reject) => {
      const params = {
        service: name,
        method: method,
        channel: channel,
        connection: connection,
        module: module,
        args: args,
      };
      socket.emit("invoke", params, (res) => {
        if (res.status === "OK") {
          resolve(res.data);
        } else {
          reject(res.msg);
        }
      });
      socket.on("disconnect", () => {
        console.log("AsyncFetch disconnted");
      });
    });
    return await promise;
  };

  const invoke = (method, args, handler) => {
    asyncFetch(method, args)
      .then((data) => handler(null, data))
      .catch((err) => {
        if (/syntax/i.test(err)) {
          handler(
            "Partner is currently not avaible. Please try again later.",
            null
          );
        } else {
          handler(err, null);
        }
      });
  };

  return { invoke };
};

/*========================================================
*
* ASYNC CALL SUPPORT
*
========================================================*/
const AsyncRemoteProxy = (name, channel, connection, module) => {
  const socket = io(CHANNEL);
  socket.connect();

  const invoke = async (method, args, handler) => {
    const promise = new Promise((resolve, reject) => {
      const params = {
        service: name,
        method: method,
        connection: connection,
        module: module,
        channel: channel,
        args: args,
      };
      socket.emit("invoke", params, (res) => {
        if (res.status === "OK") {
          if (handler) {
            handler(false, res.data);
          }
          resolve(res.data);
        } else {
          if (handler) {
            handler(res.msg);
          }
          reject(res.msg);
        }
      });
    });
    return await promise;
  };
  return { invoke };
};

const findAsyncRemoteService = (name, connection, module) => {
  const idx = name.indexOf(":");
  const channel = name.substring(0, idx);
  const serviceName = name.substring(idx + 1);
  return AsyncRemoteProxy(serviceName, channel, connection, module);
};

const AsyncLocalProxy = (name, connection, module) => {
  const invoke = async (action, args) => {
    const data = {
      service: { module, connection, name, action },
      args: args ? [args] : null,
    };

    const urlaction = "/filipizen/service/invoke";

    const res = await fetch(urlaction, {
      method: "POST",
      cache: "no-cache",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status !== 200) {
      throw res.statusText;
    }
    return await res.json();
  };
  return { invoke };
};

const findAsyncLocalService = ({ serviceName, connection, module }) => {
  return AsyncLocalProxy(serviceName, connection, module);
};

const serviceCache = {};

const Service = {};

Service.lookup = function (
  serviceName,
  connection = "default",
  module,
  options = { debug: false }
) {
  if (serviceCache[serviceName] == null) {
    let svc;
    if (isRemote(serviceName)) {
      svc = findRemoteService(serviceName, connection, module);
    } else {
      svc = findLocalService({
        serviceName,
        connection,
        module,
        ...options,
      });
    }
    serviceCache[serviceName] = svc;
  }
  return serviceCache[serviceName];
};

Service.lookupAsync = function (
  serviceName,
  connection = "default",
  module,
  options = { debug: false }
) {
  const serviceKeyName = `Async${serviceName}`;
  if (serviceCache[serviceKeyName] == null) {
    let svc;
    if (isRemote(serviceName)) {
      svc = findAsyncRemoteService(serviceName, connection, module);
    } else {
      svc = findAsyncLocalService({
        serviceName,
        connection,
        module,
        ...options,
      });
    }
    serviceCache[serviceKeyName] = svc;
  }
  return serviceCache[serviceKeyName];
};

export const getNotification = () => {
  const nsps = { "/gdx": [] };

  const register = (event, handler, nsp = "/gdx") => {
    const socket = io(nsp);
    socket.on(event, (data) => {
      handler(data);
    });

    const sockets = nsps[nsp];
    if (sockets === undefined) {
      nsps[nsp] = [socket];
    } else {
      nsps[nsp].push(socket);
    }
    return socket;
  };
  return { register };
};

export default Service;
