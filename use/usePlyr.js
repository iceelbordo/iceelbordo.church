import Plyr from 'plyr'

export function usePlyr(jsonPlyr) {
  let player
  let forceStop = false

  const play = (embedID) => {
    if (player === undefined) {
      player = new Plyr(jsonPlyr.selector, { autoplay: true })
      player.on('playing', onplaying)
    }

    if (player !== undefined) {
      player.source = {
        type: 'video',
        sources: [
          {
            src: embedID,
            provider: 'vimeo',
          },
        ],
      }
    }
  }

  const stop = async () => {
    if (!player.playing) {
      forceStop = true
    }

    if (player.playing) {
      await player.stop()
    }
  }

  const onplaying = (event) => {
    const instance = event.detail.plyr
    if (forceStop) {
      instance.stop()
      forceStop = false
    }
  }

  return {
    play,
    stop
  }
}
