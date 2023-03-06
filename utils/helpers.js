module.exports = {
  equal: function(a, b, options) {
    options = options || {};
    if (a === b) {
      return options.fn ? options.fn(this) : '';
    } else {
      return options.inverse ? options.inverse(this) : '';
    }
  }
};
