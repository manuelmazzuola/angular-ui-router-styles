module.exports = function(config) {
    config.set({
        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher'
        ],

        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'ui-router-styles.js',
            'test/ui-router-styles.js'
        ],
        browsers: ['PhantomJS'],
        singleRun: true
    });
};
