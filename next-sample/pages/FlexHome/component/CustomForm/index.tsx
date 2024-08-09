import React, { useState, useEffect, useRef } from 'react';
import { Drawer, Form, Row, Col, Button, Select, DatePicker, Space, message  } from 'antd';
import moment from 'moment'
import { log } from 'console';

const { RangePicker } = DatePicker;

interface CustomFormProps {
  visible: boolean
  setVisible: (k: boolean) => void
  recommendList: any[]
}

const CustomForm = (props: CustomFormProps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let initConfigForm: any[] = [
    {recommendLocation: 1, title: '', startDate: undefined, endDate: undefined},
    {recommendLocation: 2, title: '', startDate: undefined, endDate: undefined},
    {recommendLocation: 3, title: '', startDate: undefined, endDate: undefined},
    {recommendLocation: 4, title: '', startDate: undefined, endDate: undefined},
    {recommendLocation: 5, title: '', startDate: undefined, endDate: undefined},
    {recommendLocation: 6, title: '', startDate: undefined, endDate: undefined},
  ]
  const { 
    visible,
    setVisible,
    recommendList,
    // setRecommendList
   } = props;

   const [form] = Form.useForm();
   const dateFormat = "YYYY-MM-DD HH:mm"

   let configFields: any[];
   if (recommendList?.length > 0) {
     configFields = recommendList;
     if (recommendList?.length < 6){
       configFields = initConfigForm.map((initConfig: any) => {
         for(let i = 0; i < recommendList.length; i++) {
           if(initConfig.recommendLocation === recommendList[i]?.recommendLocation) {
             initConfig = {
              ...recommendList[i], 
              effectiveTime: [moment(recommendList[i]?.startDate), moment(recommendList[i]?.endDate)
            ]};
           }
         }
         return initConfig;
       })
     }
   } else {
     configFields = initConfigForm;
   }

   const onClose = () => {
    setVisible?.(false);
   }

   const onReset = () => {
    form.setFieldsValue({
      fields: initConfigForm
    });
   }

   const onOk = async() => {
    const values = await form.validateFields();
    values?.fields?.forEach((item: any, index: number) => {
      if(!item.effectiveTime) return;
      if(item.effectiveTime) {
        item.startDate = item.effectiveTime[0]?.format(dateFormat);
        item.endDate = item.effectiveTime[1]?.format(dateFormat);
      }
      if (typeof(item.title) === 'string') {
        item.helpinfoId = item.id;
      } else {
        item.helpinfoId = item?.title?.value
      }
      
      // ......
      
    })
   }
  

  return(
    <Drawer 
      title="测试表单" 
      open={visible} 
      onClose={onClose}
      width={554}
      footer={
        <Space>
          <Button type="primary" onClick={onReset}>reset</Button>
          <Button type="primary" onClick={onOk}>confirm</Button>
        </Space>
      }
    >
      <Form form={form} onValuesChange={(changedValues, allValues) => {
        console.log('allValues', allValues?.fields)
        // setNewAllValues(allValues?.fields)
      }}>
        <Form.List name='fields' initialValue={configFields} >
          {(fields) => fields.map(({key, name, ...resetFields}) => (
            <Row gutter={24} key={key}>
              <Col span={24}>
                <Form.Item 
                  {...resetFields}
                  label={`热门推荐${key + 1}`}
                  name={[name, "title"]}
                >
                  <Select
                    allowClear
                    showSearch
                    labelInValue
                    style={{ width: '100%' }}
                    optionFilterProp="chidren"
                    filterOption={false}
                    options={[
                      {id: 1400004, label: '场景演练1', value: '场景演练1'},
                      {id: 1700004, label: '场景演练2', value: '场景演练2'},
                      {id: 1700003, label: '场景演练3', value: '场景演练3'},
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item 
                  {...resetFields}
                  label={`生效时间`}
                  name={[name, "effectiveTime"]}
                  required={form.getFieldsValue()?.[name]?.title ? true : false}
                  rules={[
                    {
                      validator: async(_, value) => {
                        const formData = form.getFieldsValue();
                        const currentData = formData?.[name];
                        if(currentData?.title) {
                          if (value?.length > 0) {
                            return Promise.resolve();
                          }
                          return Promise.reject('请输入生效时间！')
                        }
                        return Promise.resolve();
                        
                      }
                    }
                  ]}

                >
                  <RangePicker 
                    showTime={{ format: 'HH: mm' }}
                    style={{ width: '100%' }}
                    format={dateFormat}
                  />
                </Form.Item>
              </Col>
            </Row>
          )) }
        </Form.List>
      </Form>
    </Drawer>
  )
}

export default CustomForm;