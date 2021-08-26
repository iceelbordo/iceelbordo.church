import gql from 'graphql-tag'

export const navbarQuery = gql`
  query navbarQuery {
    navbar {
      id,
      churchShortName,
      links {
        text,
        url
      }
    }
  }
`

export const homeQuery = gql`
  query homeQuery {
    home {
      verse,
      bookAbbreviation
      chapterNumber,
      verseNumber
    }
  }
`

export const sermonsQuery = gql`
  query sermonsQuery($limit: Int = 25, $start: Int = 0) {
    sermons(limit: $limit, start: $start) {
      id,
      title,
      description,
      audio {
        url,
        metadata
      }
      recordedAt
    }
  }
`

export const sermonsCountQuery = gql`
  query sermonsCountQuery {
    sermonsCount
  }
`

export const meetsQuery = gql`
  query meetsQuery($limit: Int = 25, $start: Int = 0) {
    meets(limit: $limit, start: $start) {
      id,
      title,
      description,
      video {
        provider,
        embedID,
      }
      recordedAt
    }
  }
`

export const meetsCountQuery = gql`
  query meetsCountQuery {
    meetsCount
  }
`

export const contactQuery = gql`
  query contactQuery {
    contact {
      id,
      churchName,
      map {
        address,
        zip,
        city,
        state,
        country,
        url,
      },
      email,
      schedules {
        day,
        meetingName,
        startedAt,
        finishedAt
      }
    }
  }
`

export const bannerQuery = gql`
  query bannerQuery {
    banner {
      id,
      shortDescription,
      longDescription,
      timer {
        datetime,
        timeZone
      },
      externalLink {
        text,
        url
      }
    }
  }
`
