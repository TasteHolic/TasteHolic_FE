import styled from 'styled-components';
import axios from "axios";

const DeleteWindow = styled.div`
    width: 500px;
    height: 174px;
    border-radius: 16.231px;
    border: 0.676px solid #FFF;
    background: rgba(0, 0, 0, 0.40);
    box-shadow: 0px 2.705px 2.705px 0px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(34px);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 28px;
`;
const CheckDelete = styled.p`
    color: var(--grayscale-gray50, #F3F5F6);
    text-align: center;
    /* 큰 본문 */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.64px;
    text-transform: capitalize;
`;
const WindowOptions = styled.div`
    display: flex;
    flex-direction: row;

    gap: 12px;
`;
const DeleteButton = styled.button`
    display: flex;
    padding: 12px 24px;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    border: 1px solid rgba(0, 0, 0, 0.20);
    background: #FFF;

    color: #000;

    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.64px;
    text-transform: capitalize;

    cursor: pointer;
`;
const CancelButton = styled.button`
    display: flex;
    padding: 12px 24px;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    border: 1px solid rgba(0, 0, 0, 0.20);
    background: rgba(255, 255, 255, 0.10);

    color: #FFF;

    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.64px;
    text-transform: capitalize;

    cursor: pointer;
`;

interface DeleteWindowProps {
    deleteId: number;
    deleteItem: string;
    onDelete: () => void;
    onCancel: () => void;
}

const DeleteRecipeWindow: React. FC<DeleteWindowProps> = ({deleteId, deleteItem, onDelete, onCancel}) => {
    const deleteRecipe = async (id: number) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }
    
        try {    
            const response = await axios.delete(`http://54.180.45.230:3000/api/v1/recipes/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
    
            if (response.data.resultType === "SUCCESS" && response.data.success?.success) {
                alert("레시피가 삭제되었습니다.");
                onDelete();
            } else {
                alert("삭제에 실패했습니다.");
            }
    
        } catch (error: any) {
            console.error("레시피 삭제 실패:", error);
    
            if (error.response) {
                const { status, data } = error.response;
    
                if (status === 403) {
                    alert("삭제 권한이 없습니다.");
                } else if (status === 404 && data.error?.errorCode === "R001") {
                    alert("해당 레시피를 찾을 수 없습니다.");
                } else {
                    alert("삭제 중 오류가 발생했습니다.");
                }
            } else {
                alert("서버와의 연결이 원활하지 않습니다.");
            }
        }
    };
    
    
    
    return (
        <>
            <DeleteWindow>
                <CheckDelete>'{deleteItem}'을/를 삭제하시겠습니까?</CheckDelete>
                <WindowOptions>
                    <DeleteButton 
                        onClick={() => 
                        {onDelete();
                        deleteRecipe(deleteId);
                        }}>
                        삭제
                    </DeleteButton>
                    <CancelButton onClick={onCancel}>취소</CancelButton>
                </WindowOptions>
            </DeleteWindow>
        </>
    );
};

export default DeleteRecipeWindow
