export function useClipboard() {
  const copyFrom = (selector = '#clipboard', value) => {
    const input = document.querySelector(selector)
    if (input === null) return;

    input.value = value
    input.select()
    input.setSelectionRange(0, value.length)

    document.execCommand('copy');
  }

  return { copyFrom }
}
