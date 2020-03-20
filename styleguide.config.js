module.exports = {
  // set your styleguidist configuration here
  title: 'Tick Docs',
  version: '0.1',
  usageMode: 'expand',
	exampleMode: 'collapse',
  sections: [
    {
      name: 'Pages',
      components: 'src/views/*.vue'
    },
    {
      sections: [
        {
          name: 'UI',
          components: 'src/components/UI/*.vue'
        }
      ],
      name: 'Components',
      components: 'src/components/*.vue',
      
    },
    {
      name: 'Modal',
      components: 'src/Modal/[A-Z]*.vue'
    },
  ]
}
