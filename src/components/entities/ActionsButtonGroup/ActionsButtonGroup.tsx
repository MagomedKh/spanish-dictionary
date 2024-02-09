import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import { FC } from "react";
import styles from "./ActionsButtonGroup.module.scss";

interface IActionsButtonGroup {
   isEditing: boolean;
   onSave: () => void;
   onEditOn: () => void;
   onDelete: () => void;
}

const ActionsButtonGroup: FC<IActionsButtonGroup> = ({ isEditing, onDelete, onSave, onEditOn }) => {
   return (
      <ButtonGroup className={`${styles.buttonGroup} ${isEditing && styles.active}`}>
         {isEditing ? (
            <Button onClick={onSave}>
               <CheckOutlined />
            </Button>
         ) : (
            <Button onClick={onEditOn}>
               <EditOutlined />
            </Button>
         )}
         <Button onClick={onDelete}>
            <DeleteOutlined />
         </Button>
      </ButtonGroup>
   );
};

export default ActionsButtonGroup;
