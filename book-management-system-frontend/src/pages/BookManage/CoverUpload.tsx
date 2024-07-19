/* eslint-disable @typescript-eslint/ban-types */

import { message } from "antd";
import {  InboxOutlined } from '@ant-design/icons'

import { DraggerProps } from "antd/es/upload";
import Dragger from "antd/es/upload/Dragger";


interface CoverUploadProps {
    value?: string;
    onChange?: Function;
}

let onChange: Function;

const props: DraggerProps = { 
    name: "file",
    action: "http://localhost:3000/book/upload",
    method: 'post',
    onChange(info) {
        const { status } = info.file;
        if (status === 'done') {
            onChange(info.file.response);
            message.success(`${info.file.name} 上传成功`);
        } else if (status === 'error') {
            message.error(`${info.file.name} 上传失败`);
        }
    },
    showUploadList: false,
}

const dragger = <Dragger {...props}>
    <p className="ant-upload-drag-icon">
        <InboxOutlined />
    </p>
    <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
</Dragger>

export function CoverUpload(props: CoverUploadProps) {
    onChange = props.onChange!;
    return (
        props.value ?
        <div>
            <img src={'http://localhost:3000/' + props.value} alt="封面" width="100" height="100"/>
            {dragger}
        </div>
       :<div>
            {dragger}
       </div> 
    )
}