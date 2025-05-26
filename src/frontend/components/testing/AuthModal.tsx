import { Dispatch, SetStateAction, CSSProperties } from 'react';
import { ProviderInfo } from '../../data/providerData';
import { Modal } from '../utils/Modal';

type AuthModalProps = {
  modalContent: ProviderInfo | null;
  setModalContent: Dispatch<SetStateAction<ProviderInfo | null>>;
};

const getContrastColor = (hex: string): string => {
  const red = parseInt(hex.slice(1, 3), 16)
  const green = parseInt(hex.slice(3, 5), 16)
  const blue = parseInt(hex.slice(5, 7), 16)
  const yiq = (red * 299 + green * 587 + blue * 114) / 1000
  return yiq >= 128 ? '#000' : '#fff'
}

export const AuthModal = ({ modalContent, setModalContent }: AuthModalProps) => {
  const primaryColor = modalContent?.primaryColor ?? '#000';

  const linkStyle: CSSProperties = {
    flex: '1',
    textAlign: 'center',
    padding: '12px 0',
    border: `2px solid ${primaryColor}`,
    borderRadius: '4px',
    textDecoration: 'none',
    color: 'black',
    fontWeight: 500
  };

  const opButtonStyle: CSSProperties = {
    width: '100%',
    padding: '12px 0',
    border: `2px solid ${primaryColor}`,
    borderRadius: '4px',
    backgroundColor: primaryColor,
    color: getContrastColor(primaryColor),
    cursor: 'pointer',
    fontWeight: 500
  };

  return (
    <Modal
      style={{
        width: '500px',
        maxWidth: '95vw',
        padding: '32px',
        backgroundColor: '#fff',
        border: `3px solid ${primaryColor}`,
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: '24px'
      }}
      isOpen={modalContent !== null}
      onClose={() => setModalContent(null)}
    >
      <h2
        style={{
          fontSize: '1.75rem',
		  fontWeight:'bold',
          margin: 0,
          textAlign: 'center'
        }}
      >
        {modalContent?.name}
      </h2>

      <img
        src={modalContent?.logoUrl}
        alt={`${modalContent?.name} logo`}
        style={{
          width: '120px',
          height: '120px',
          alignSelf: 'center'
        }}
      />

      <nav style={{ display: 'flex', gap: '16px' }}>
        <a href={modalContent?.manageCredentialsUrl} style={linkStyle}>
          Manage Credentials
        </a>
        <a href={modalContent?.createNewCredentialsUrl} style={linkStyle}>
          Create New Credentials
        </a>
      </nav>

      <nav style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <button style={opButtonStyle}>Authorize User</button>
        <button style={opButtonStyle}>Refresh Token</button>
        <button style={opButtonStyle}>Revoke Token</button>
        <button style={opButtonStyle}>Fetch Profile</button>
      </nav>
    </Modal>
  );
};