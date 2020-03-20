module.exports = {
  // set your styleguidist configuration here
  title: 'Tick Docs',
  // components: 'src/**/[A-Z]*.{vue,js}',
  // defaultExample: true,
  sections: [
    {
      name: 'Classes',
      components: 'src/classes/[A-Z]*.js'
    },
    {
      name: 'Plugins',
      components: 'src/plugins/[A-Z]*.js'
    },
    {
      name: 'Pages',
      components: 'src/views/[A-Z]*.vue'
    },
    {
      name: 'Components',
      components: 'src/components/[A-Z]*.vue',
      sections: [
        {
          name: 'UI',
          components: 'src/classes/[A-Z]*.vue'
        }
      ]
    },
    {
      name: 'Modal',
      components: 'src/Modal/[A-Z]*.vue'
    },
  ],
  exampleMode: 'expand'
}
