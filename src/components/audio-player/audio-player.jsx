import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.audioRef = createRef();

    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    const {src} = this.props;
    const audio = this.audioRef.current;
    audio.src = src;

    audio.oncanplaythrough = () => {
      this.setState({
        isLoading: false
      });
    };
  }

  componentWillUnmount() {
    const audio = this.audioRef.current;

    audio.oncanplaythrough = null;
  }

  render() {
    const {isLoading} = this.state;
    const {onPlayButtonClick, isPlaying} = this.props;

    return (
      <>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={onPlayButtonClick}
        />
        <div className="track__status">
          <audio
            ref={this.audioRef}
          />
        </div>
      </>
    );
  }

  componentDidUpdate() {
    const audio = this.audioRef.current;
    if (this.props.isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }
}

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired
};

export default AudioPlayer;

