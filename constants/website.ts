const WEBSITE = {
  TWITTER: {
    USERNAME: '@EndTaichi',
    CARDTYPE: 'summary',
  },
  NAME: 'chotto.dev',
  INDEXPAGE: {
    EN_US: {
      DESCRIPTION: 'Personal blog',
    },
    JA_JP: {
      DESCRIPTION: '個人ブログ',
    },
  },
  TAGSPAGE: {
    EN_US: {
      DESCRIPTION: 'Articles related to the tag',
    },
    JA_JP: {
      DESCRIPTION: 'タグに関連した記事一覧',
    },
  },
  POSTPAGE: {
    EN_US: {
      DESCRIPTION: 'Articles',
    },
    JA_JP: {
      DESCRIPTION: '記事一覧',
    },
  },
  NOTFOUNDPAGE: {
    EN_US: {
      TITLE: 'Not Found',
      DESCRIPTION: 'This page does not exist',
    },
    JA_JP: {
      TITLE: 'ページが見つかりませんでした',
      DESCRIPTION: 'お探しのページは存在しません',
    },
  },
  HOSTNAME: 'www.chotto.dev',
  PROTOCOL: 'https',
} as const;

export { WEBSITE };
