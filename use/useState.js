export function useState() {
  let state = {
    isVisible: false,
    isLoading: false
  }

  const toggleIsVisible = () => { 
    state.isVisible = !state.isVisible
  }

  const setIsVisible = (isVisible) =>  {
    state.isVisible = isVisible
  }

  const toggleIsLoading = () => {
    state.isLoading = !state.isLoading
  }

  return {
    state,
    toggleIsVisible,
    setIsVisible,
    toggleIsLoading
  }
}
