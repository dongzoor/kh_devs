import React from 'react';
import '../App';
import './Modal.css';

const JwModal = (props) => {
    const { open, confirm, close, type, header } = props;
    return (
        <div className={open ? 'openModal modal' : 'modal'}>
            {open &&
                <section>
                    <header>
                        {header}
                        <button onClick={confirm}>
                            &times;
                        </button>
                        
                        <button className="close"  onClick={close}>
                            &times;
                        </button>
                    </header>
                    <main>{props.children}</main>
                    <footer>
                        {type && <button onClick={confirm}>확인</button>}
                        <button onClick={close}>닫기</button>
                    </footer>
                </section>
            }
        </div>
    );
};
export default JwModal;