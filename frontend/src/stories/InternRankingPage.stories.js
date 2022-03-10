import InternRankingPage from '../pages/InternRankingPage';
import { friends } from '../data/socials';
import { data as headerData } from '../data/header';

export default {
  component: InternRankingPage,
  title: 'Intern Ranking Page',
};

const Template = (args) => <InternRankingPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  currentUser: headerData[11],
  searchFriends: (searchString) => {
    return new Promise((resolve, reject) => {
      if (!searchString || searchString === '') resolve([]);
      try {
        const results = friends.filter(
          (item, idx) =>
            item.firstName.indexOf(searchString) !== -1 ||
            item.lastName.indexOf(searchString) !== -1
        );
        resolve(results);
      } catch (e) {
        reject(e);
      }
    });
  },
  tagFriend: (userId) => {
    return new Promise((resolve, reject) => {
      resolve(userId);
    });
  },
  unTagFriend: (userId) => {
    return new Promise((resolve, reject) => {
      resolve(userId);
    });
  },
};
