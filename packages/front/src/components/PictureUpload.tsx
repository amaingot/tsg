import React from 'react';

import defaultImage from 'static/material-images/default-avatar.png';

interface State {
  file?: object;
  imagePreviewUrl: any;
}

class PictureUpload extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      imagePreviewUrl: defaultImage,
    };
  }

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

  public render() {
    return (
      <div className="picture-container">
        <div className="picture">
          <img src={this.state.imagePreviewUrl} className="picture-src" alt="..." />
          <input type="file" onChange={this.handleImageChange} />
        </div>
        <h6 className="description">Choose Picture</h6>
      </div>
    );
  }
}

export default PictureUpload;
