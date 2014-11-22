module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            // define files to lint
            files: ['gruntfile.js', 'js/app.js', 'engine.js', 'resources.js'],
            // configure jshint
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');


    // run these by typing "grunt test" at the command line
    grunt.registerTask('test', ['jshint']);
    // run these by tying "grunt" on the command line
    grunt.registerTask('default', []);
};
