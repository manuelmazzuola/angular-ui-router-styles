module.exports = function(grunt) {
    grunt.initConfig({
        karma: {
            travis: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.registerTask('test', ['karma:travis'])
};
