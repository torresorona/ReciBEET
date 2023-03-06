module.exports = {
  equal: function(a, b, options) {
    if (a === b) {
      return options.fn(this);
    } else {
      // Check if options.inverse is a function before calling it
      if (typeof options.inverse === 'function') {
        return options.inverse(this);
      } else {
        return '';
      }
    }
  }
};
