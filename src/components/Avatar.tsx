interface AvatarProps {
    src: string;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {

    return (
        <div className='rounded-full h-[40px] w-[40px] overflow-hidden'>
            <img src={src} alt='avatar' />
        </div>
    );
};

export default Avatar;