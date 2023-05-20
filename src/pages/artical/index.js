import {
 Card,
 Breadcrumb,
 Form,
 Button,
 Radio,
 Input,
 Upload,
 Space,
 Select, message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { httpHelper } from '@/utils'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

const { Option } = Select

function Artical () {
 const nav = useNavigate()
 // 1. 声明一个暂存仓库
 const fileListRef = useRef([])

 const [urlparams] = useSearchParams()
 const pid = urlparams.get('id')

 const [pType, setPType] = useState([])
 useEffect(() => {
  async function fetchChannels () {
   const res = await httpHelper.get('/channels')
   setPType(res.data.channels)
  }
  fetchChannels()
 }, [])

 //图片处理的相关逻辑
 const [fileList, setFileList] = useState([])
 // 上传成功回调
 const onUploadChange = (info) => {
  const fileList = info.fileList.map(file => {
   if (file.response) {
    return {
     url: file.response.data.url
    }
   }
   return file
  })
  console.log(fileList)
  setFileList(fileList)
  fileListRef.current = fileList
 }
 const [imgCount, setImgCount] = useState(1)
 const changeType = e => {
  const count = e.target.value
  setImgCount(count)

  if (count === 1) {
   // 单图，只展示第一张
   const firstImg = fileListRef.current[0]
   setFileList(!firstImg ? [] : [firstImg])
  } else if (count === 3) {
   // 三图，展示所有图片
   setFileList(fileListRef.current)
  }
 }

 //发布文章
 const onFinish = async (values) => {
  // 数据的二次处理 重点是处理cover字段
  const { channel_id, content, title, type } = values
  const params = {
   channel_id,
   content,
   title,
   type,
   cover: {
    type: type,
    images: fileList.map(item => item.url)
   }
  }
  if (pid) {
   // 编辑
   await httpHelper.put(`/mp/articles/${pid}?draft=false`, params)
  } else {
   // 新增
   await httpHelper.post('/mp/articles?draft=false', params)
  }
  message.success("操作成功！")
  nav("/Admin/Cms")
 }
 const [form] = Form.useForm()
 useEffect(() => {
  async function getArticle () {
   const res = await httpHelper.get(`/mp/articles/${pid}`)
   const data = res.data
   // 表单数据回填
   form.setFieldsValue({ ...data, type: data.cover.type })
   // 回填upload
   const formatImgList = data.cover.images.map(url => ({ url }))
   setFileList(formatImgList)
   // 暂存列表里也存一份
   fileListRef.current = formatImgList
   // 图片type
   setImgCount(data.cover.type)
  }
  if (pid) {
   // 拉取数据回显
   getArticle()
  }
 }, [pid, form])

 return (
  <div className="publish">
   <Card
    title={
     <Breadcrumb separator=">">
      <Breadcrumb.Item>
       <Link to="/home">首页</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>{pid !== null ? "编辑" : "发布"}文章</Breadcrumb.Item>
     </Breadcrumb>
    }
   >
    <Form
     labelCol={{ span: 4 }}
     wrapperCol={{ span: 16 }}
     initialValues={{ type: 1 }}
     onFinish={onFinish}
     form={form}
    >
     <Form.Item
      label="标题"
      name="title"
      rules={[{ required: true, message: '请输入文章标题' }]}
     >
      <Input placeholder="请输入文章标题" style={{ width: 400 }} />
     </Form.Item>
     <Form.Item
      label="频道"
      name="channel_id"
      rules={[{ required: true, message: '请选择文章频道' }]}
     >
      <Select placeholder="请选择文章频道" style={{ width: 400 }}>
       {pType.map(item => (
        <Option key={item.id} value={item.id}>
         {item.name}
        </Option>))}
      </Select>
     </Form.Item>

     <Form.Item label="封面">
      <Form.Item name="type">
       <Radio.Group onChange={changeType}>
        <Radio value={1}>单图</Radio>
        <Radio value={3}>三图</Radio>
        <Radio value={0}>无图</Radio>
       </Radio.Group>
      </Form.Item>
      {imgCount > 0 ? (
       <Upload
        name="image"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList
        action="http://geek.itheima.net/v1_0/upload"
        maxCount={imgCount}
        multiple={imgCount > 1}
        fileList={fileList}
        onChange={onUploadChange}
       >
        <div style={{ marginTop: 8 }}>
         <PlusOutlined />
        </div>
       </Upload>) : null}
     </Form.Item>
     <Form.Item
      label="内容"
      name="content"
      rules={[{ required: true, message: '请输入文章内容' }]}
     >
      <ReactQuill
       className="publish-quill"
       theme="snow"
       placeholder="请输入文章内容"
      />
     </Form.Item>

     <Form.Item wrapperCol={{ offset: 4 }}>
      <Space>
       <Button type="primary" htmlType="submit">
        {pid !== null ? "更新" : "发布"}文章
       </Button>
      </Space>
     </Form.Item>
    </Form>
   </Card>
  </div>
 )
}

export default observer(Artical)