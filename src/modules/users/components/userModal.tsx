import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import { useTranslation } from 'next-i18next';
import { useUser } from '../hooks/useUser';
import { User } from '../models';

interface UserModalProps {
  isEdit: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userData?: User;
}

const UserModal: React.FC<UserModalProps> = ({ isEdit, isOpen, setIsOpen, userData }) => {
  // Translation hook
  const { t } = useTranslation('common');

  // States
  const [username, setUsername] = useState<string>(userData?.username || '');
  const [name, setName] = useState<string>(userData?.name || '');
  const { apiCreateUser } = useUser();

  //Handle submit create/edit user
  const handleSubmit = () => {
    if (username && name) {
      if (isEdit) {
        // Call graphql mutation for update
      } else {
        const res = apiCreateUser({
          id: 1,
          username: username,
          name: name,
        });
        console.log(res);
      }
    }
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
