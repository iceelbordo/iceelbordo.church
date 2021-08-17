const { Howl } = require('howler')

export function useHowler(jsonHowler) {
  const onTimeout = () => {
    let status
    if (jsonHowler.onprogress !== undefined) {
      status = jsonHowler.onprogress()
    }
    if (status === 0) {
      setTimeout(onTimeout, 500)
    }
  }

  const howl = new Howl({
    src: jsonHowler.src,
    onplay: onTimeout,
    onload: () => {
      howlState.loaded = true

      howl.on('play', () => {
        howlState.playing = true
        if (jsonHowler.onplay !== undefined) {
          jsonHowler.onplay()
        }
      })
      howl.on('end', () =>  {
        howlState.playing = false
      })
      howl.on('pause', () => {
        howlState.playing = false
      })
      howl.on('stop', () => {
        howlState.playing = false
      })
    }
  })

  const howlState = {
    playing: false,
    loaded: false
  }

  const play = () => {
    howl.play()
  }

  const pause = () => {
    howl.pause()
  }

  const seek = (percentage) => percentage === undefined ? howl.seek() : howl.seek(percentage)

  const playedHours = () => {
    let lastHours = 0
    if (!howl.playing()) {
      return lastHours.toString().padStart(2, '0')
    }
    lastHours = Math.floor(howl.seek() / 60 / 60)
    return lastHours.toString().padStart(2, '0')
  }

  const playedMinutes = () => {
    let lastMinutes = 0
    if (!howl.playing()) {
      return lastMinutes.toString().padStart(2, '0')
    }
    lastMinutes = Math.floor(howl.seek() / 60)
    return lastMinutes.toString().padStart(2, '0')
  }

  const playedSeconds = () => {
    let lastSeconds = 0
    if (!howl.playing()) {
      return lastSeconds.toString().padStart(2, '0')
    }
    lastSeconds = Math.floor(howl.seek() % 60)
    return lastSeconds.toString().padStart(2, '0')
  }

  return {
    howlState,
    play,
    pause,
    seek,
    playedHours,
    playedMinutes,
    playedSeconds
  }
}
