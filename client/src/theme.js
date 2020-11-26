const constants = {
  error: '#f5222d',
  vote: '#b6b6b6',
  upvote: '#f9920b',
  downvote: '#2e70ff'
};

const dark = {
  ...constants,
  invert: '#f4f6f8',
  primary: '#e68c1e',
  normalText: '#ffffff',
  mutedText: '#b0b8bf',
  icon: '#bec9d1',
  headerIcon: '#d7dadc',
  border: '#333333',
  accent: '#ffa538',
  danger: '#ff4444',
  pageBackground: '#1b1b1b',
  voteButtonHover: '#383838',
  foreground: '#262626',
  activeBackground: '#333333',
  inputBackground: '#212121',
  shadow: 'rgba(0, 0, 0, 0.4)',
  hover: '#343536',
  
};

const light = {
  ...constants,
  invert: '#1b1b1b',
  primary: '#d47f17',
  normalText: '#454f5b',
  mutedText: '#818e99',
  headerIcon: '#484b4d',
  icon: '#8f9ca8',
  border: '#ccc',
  accent: '#ff930f',
  danger: '#CC0000',
  pageBackground: '#dae0e6',
  voteButtonHover: '#f2f2f2',
  foreground: '#ffffff',
  activeBackground: '#fafafa',
  inputBackground: '#f6f7f8',
  shadow: 'rgba(0, 0, 0, 0.05)',
  hover: '#edeff1'
};

const theme = isDark => (isDark ? dark : light);

export default theme;
