const constants = {
  error: '#f5222d',
  vote: '#b6b6b6',
  upvote: '#f9920b',
  downvote: '#2e70ff'
};

const dark = {
  ...constants,
  invert: '#f4f6f8',
  primary: '#1E78D8',
  normalText: '#ffffff',
  mutedText: '#b0b8bf',
  icon: '#bec9d1',
  headerIcon: '#d7dadc',
  border: '#333333',
  accent: '#33a0ff',
  danger: '#ff4444',
  pageBackground: '#1b1b1b',
  voteButtonHover: '#383838',
  foreground: '#262626',
  activeBackground: '#333333',
  inputBackground: '#212121',
  shadow: 'rgba(0, 0, 0, 0.4)',
  hover: '#343536'
};

const light = {
  ...constants,
  invert: '#1b1b1b',
  primary: '#1E78D8',
  normalText: '#454f5b',
  mutedText: '#818e99',
  headerIcon: '#484b4d',
  icon: '#8f9ca8',
  border: '#ebedf0',
  accent: '#1890ff',
  danger: '#CC0000',
  pageBackground: '#f4f6f8',
  voteButtonHover: '#f2f2f2',
  foreground: '#ffffff',
  activeBackground: '#fafafa',
  inputBackground: '#fcfcfc',
  shadow: 'rgba(0, 0, 0, 0.05)',
  hover: '#edeff1'
};

const theme = isDark => (isDark ? dark : light);

export default theme;
