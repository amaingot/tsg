import React from 'react';
// used for making the prop types of this component

// core components
import Button from 'components/Button';

import defaultImage from 'static/material-images/image_placeholder.jpg';
import defaultAvatar from 'static/material-images/placeholder.jpg';

interface Props {
  avatar: boolean;
  addButtonProps: object;
  changeButtonProps: object;
  removeButtonProps: object;
}

interface State {
  file?: object;
  imagePreviewUrl: any;
}

class ImageUpload extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      file: undefined,
      imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage,
    };
    this.fileInput = React.createRef();
  }

  public fileInput: React.RefObject<HTMLInputElement>;

  public handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.currentTarget.files) {
      // TODO: handle gracefully
      return;
    }

    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  public handleSubmit = (e: React.MouseEvent<{}>) => {
    e.preventDefault();
    // this.state.file is the file/image uploaded
    // in this function you can save the image (this.state.file) on form submit
    // you have to call it yourself
  };

  public handleClick = () => {
    if (this.fileInput.current) {
      this.fileInput.current.click();
    }
  };

  public handleRemove() {
    this.setState({
      file: undefined,
      imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage,
    });

    if (this.fileInput.current) {
      this.fileInput.current.value = '';
    }
  }

  public render() {
    const { avatar, addButtonProps, changeButtonProps, removeButtonProps } = this.props;

    return (
      <div className="fileinput text-center">
        <input type="file" onChange={this.handleImageChange} ref={this.fileInput} />
        <div className={'thumbnail' + (avatar ? ' img-circle' : '')}>
          <img src={this.state.imagePreviewUrl} alt="..." />
        </div>
        <div>
          {this.state.file === null ? (
            <Button {...addButtonProps} onClick={this.handleClick}>
              {avatar ? 'Add Photo' : 'Select image'}
            </Button>
          ) : (
            <span>
              <Button {...changeButtonProps} onClick={this.handleClick}>
                Change
              </Button>
              {avatar ? <br /> : null}
              <Button {...removeButtonProps} onClick={this.handleRemove}>
                <i className="fas fa-times" /> Remove
              </Button>
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default ImageUpload;
