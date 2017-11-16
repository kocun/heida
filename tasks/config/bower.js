module.exports = function(grunt) {
  grunt.config.set('bower', {
    dev: {
      install: {
        options: {
          targetDir: './assets',
          cleanTargetDir: true,
          cleanBowerDir: true,
          install: true,
          copy: true
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-bower-task');
};