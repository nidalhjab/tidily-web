import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Button } from "../../common/components/Button/Button";
import { useMe } from "../../common/hooks/useMe.hook";
import { UPLOAD_PHOTO } from "../../graphql/Mutations";
import './Profile.css';


export const Profile: React.FC = () => {
    const { userInfo } = useMe();
    const [img, setImg] = useState(userInfo.img_file);
    const [newImg, setNewImg] = useState(false);
    const [uploadImg, { data }] = useMutation(UPLOAD_PHOTO)
    let firstName = userInfo.name?.split(" ")[0];
    let lastName = userInfo.name?.split(" ")[1];
    let imageCharacters = firstName && lastName ? firstName[0] + lastName[0] : 'TT';
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
        reader.onloadend = () => {
            setImg(reader.result);
            setNewImg(true)
        }
        if (file) {
            reader.readAsDataURL(file)
        }
    }
    useEffect(() => {
        if (data) {
            setNewImg(false)
        }
    }, [data])
    const updatePhoto = () => {
        uploadImg({
            variables: {
                id: userInfo.id,
                img_file: img
            }
        })
    }
    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="card-img">
                    <div className="photo">
                        <input id="photo-upload" type="file" onChange={onChange} />
                        {img && <img src={`${img}`} alt="profile photo" />}
                        <p id="name">{imageCharacters}</p>
                    </div>
                    <div className="actions">
                        {newImg && <Button OnClick={updatePhoto} type="button" title="Save" />}
                    </div>
                </div>


                <div className="card-item">
                    Name: <span>{userInfo.name}</span>
                </div>
                <div className="card-item">
                    Email: <span>{userInfo.email}</span>
                </div>
                <div className="card-item">
                    Phone: <span>{userInfo.phone}</span>
                </div>
            </div>
        </div>
    )
}