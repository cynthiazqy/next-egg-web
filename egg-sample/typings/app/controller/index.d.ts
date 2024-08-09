// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportApi from '../../../app/controller/api';
import ExportPageInfo from '../../../app/controller/pageInfo';

declare module 'egg' {
  interface IController {
    api: ExportApi;
    pageInfo: ExportPageInfo;
  }
}
