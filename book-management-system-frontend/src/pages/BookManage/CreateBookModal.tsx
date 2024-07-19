/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { Form, Input, Modal, message,  } from "antd";
import { useForm } from "antd/es/form/Form";
import { create } from "../../api";
import { CoverUpload } from "./CoverUpload";

interface CreateBookModalProps {
    isOpen: boolean;
    handleClose: Function;
}


const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
}

export interface CreateBook {
    name: string;
    author: string;
    description: string;
    cover: string;
}

export function CreateBookModal(props: CreateBookModalProps) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [form] = useForm<CreateBook>();

    const handleOk = async function () {
        await form.validateFields();
        const values = form.getFieldsValue();
        try {
            const res = await create(values);
            if (res.status === 200 || res.status === 201) {
                message.success('图书创建成功');
                form.resetFields();
                props.handleClose();
            } else {
                message.error('图书创建失败');

            }
 
        } catch(e: any) {
            message.error(e.response.data.message);
        }
    }

    return (
        <Modal
            title="新增图书"
            open={props.isOpen}
            onOk={handleOk}
            okText="创建"
            cancelText="取消"
            onCancel={() => {
                form.resetFields();
                props.handleClose();
            }}

        >
            <Form
                {...layout}
                form={form}
                colon={false}
            >
                <Form.Item
                    label="图书名称"
                    name="name"
                    rules={[{ required: true, message: '请输入图书名称' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    label="作者"
                    name="author"
                    rules={[{ required: true, message: '请输入作者' }]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="图书描述"
                    name="description"
                    rules={[{ required: true, message: '请输入图书描述' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="图书封面"
                    name="cover"
                    rules={[{ required: true, message: '请上传图书封面'}]}
                >

                    <CoverUpload/>
                </Form.Item>
            </Form>

        </Modal>
    )

}
