export const getComponentName = (component) => {
  const componentName =
    component.split('.')[1].charAt(0).toLowerCase() +
    component.split('.')[1].slice(1)

  return componentName
}
// Đổi tên từ __component: layout.a-blog-post thành LayoutABlogPost component
export const transformComponentName = (component) => {
  const splitsComponent = component
    .split('.')
    .map((componentName) => componentName.toLowerCase())
  const componentName = splitsComponent.join('-')
  console.log('component,componentName', component, componentName)

  return componentName
}

export const scrollToTop = () => {
  return window.scrollTo(0, 0)
}

export const scrollToSection = (element) => {
  return element.scrollIntoView({ behavior: 'smooth' })
}
