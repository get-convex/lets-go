// https://medium.com/@abc810221/easynchronous-map-29272353329e
const asyncMap = async (tasks: any[], callback: Function) => {
  var arrayOfPromises = tasks.map(function (task) {
    return new Promise(task);
  });

  return Promise.all(arrayOfPromises).then(function (values) {
    callback(values);
  });
};

export default asyncMap;
