/**
 * @description handle business logic
 * @author Cynthiazqy
 */

import { Service } from 'egg';

interface PageInfoProps {
  id?: number | null;
  title: string | null;
  score: string | null;
  viewsNum: string | null;
  para: string | null;
  subPara1: string | null;
  subPara2: string | null;
}
class UserService extends Service {
  async getPageInfo(): Promise<PageInfoProps> {
    const pageInfo = {
      title: 'Alberto Nuñez Upper Lower Program',
      score: '4.35',
      viewsNum: '89',
      para: '4-day a week upper lower split by bodybuilding coach Alberto Nuñez, with 4 program variations..',
      subPara1:
        'This 4-Day Upper Lower Program is designed by Alberto Nuñez, who is the head bodybuilding coach at 3D Muscle Journey. Alberto is a accomplished lifelong natural bodybuilder, having most recently won Mr. Universe at the 2022 WNBF.',
      subPara2:
        'Alberto Nuñez designed this program to target your upper and lower body muscles twice a week. Additionally, there are 4 program variations for you to choose from, with each focused more on a specific muscle group.',
    };
    return pageInfo;
  }
}

module.exports = UserService;
