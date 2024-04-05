import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import { useTranslation } from 'next-i18next';

interface UserModalProps {
  isEdit: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userData?: UserData;
}

interface UserData {
  username: string;
  name: string;
}

const UserModal: React.FC<UserModalProps> = ({ isEdit, isOpen, setIsOpen, userData }) => {
  // Translation hook
  const { t } = useTranslation('common');

  // States
  const [username, setUsername] = useState(userData?.username);
  const [name, setName] = useState(userData?.name);

  //Handle submit create/edit user
  const handleSubmit = () => {
    if (isEdit) {
      // Call graphql mutation for update
    } else {
      // Call graphql mutation for create
    }
    console.log(userData);
    setIsOpen(false);
  };

  return (
    <Modal
      title={isEdit ? t('EDIT_USER') : t('CREATE_USER')}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={() => setIsOpen(false)}
      okText={isEdit ? t('EDIT') : t('CREATE')}
      cancelText={t('CANCEL')}
      okButtonProps={{ style: { backgroundColor: '#f759ab' } }}
    >
      <div className="mb-10 mt-5">
        <div className="mb-2">
          <label>{t('USERNAME')}:</label>
          <Input className="mt-2" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>{t('FULLNAME')}:</label>
          <Input className="mt-2" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
