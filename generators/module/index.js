const componentExists = require('../utils/componentExists');

module.exports = {
  description:
    'Create a module in the DUCK pattern (reducer, actions, selectors, constants)',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Todo',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A module with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
  ],
  actions: data => {
    const componentTemplate = './module/duck.js.hbs';
    const testTemplate = './module/spec.js.hbs';
    const indexTemplate = './module/index.js.hbs';

    const actions = [
      {
        type: 'add',
        path: '../src/modules/{{properCase name}}/{{properCase name}}.js',
        templateFile: componentTemplate,
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/modules/{{properCase name}}/{{properCase name}}.spec.js',
        templateFile: testTemplate,
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/modules/{{properCase name}}/index.js',
        templateFile: indexTemplate,
        abortOnFail: true,
      },
    ];

    return actions;
  },
};
