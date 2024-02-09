import { Button, Flex, Form, Input, Typography } from "antd";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWord } from "../../../store/sagas/wordsSaga";
import { selectCurrentCardId } from "../../../store/slices/CollectionsSlice";
import styles from "./AddWordForm.module.scss";

const initialFormValue = { learn: "", ru: "", en: "" };

const AddWordForm: FC = () => {
   const dispatch = useDispatch();
   const [form] = Form.useForm<typeof initialFormValue>();

   const cardId = useSelector(selectCurrentCardId);

   const handleCreateWord = () => {
      if (cardId) {
         dispatch(addWord({ cardId, word: form.getFieldsValue() }));

         form.resetFields();
      }
   };

   return (
      <Form form={form} onFinish={handleCreateWord} autoComplete="off">
         <Typography.Title level={4}>Добавить новое слово</Typography.Title>

         <Flex align="end" className={styles.form}>
            {Object.keys(initialFormValue).map((fieldName) => (
               <Flex key={fieldName} vertical className={styles.inputWrapper}>
                  <Typography.Title level={5} className={styles.inputTitle}>
                     {fieldName === "learn"
                        ? "Изучаемое слово"
                        : fieldName[0].toUpperCase() + fieldName.slice(1)}
                  </Typography.Title>

                  <Form.Item name={fieldName} rules={[{ required: true }]}>
                     <Input
                        name={fieldName}
                        placeholder={`Введите ${fieldName === "learn" ? "слово" : "перевод"}`}
                     />
                  </Form.Item>
               </Flex>
            ))}

            <Form.Item>
               <Button htmlType="submit" type="primary">
                  Добавить в словарь
               </Button>
            </Form.Item>
         </Flex>
      </Form>
   );
};

export default AddWordForm;
