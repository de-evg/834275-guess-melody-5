import React, {PureComponent} from 'react';
import AudioPlayer from "../../components/audio-player/audio-player";

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activePlayerID: 0
      };
    }

    render() {
      const {activePlayerID} = this.state;

      return <Component
        {...this.props}
        renderPlayer={(src, id) => {
          return (
            <AudioPlayer
              src={src}
              isPlaying={id === activePlayerID}
              onPlayButtonClick={() => this.setState({
                activePlayerID: activePlayerID === id ? -1 : id
              })}
            />
          );
        }}
      />;
    }
  }
  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;
