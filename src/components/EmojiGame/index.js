/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

// Write your code here.
import {Component} from 'react'
import EmojiCard from '../EmojiCard'
import NavBar from '../NavBar'
import WinOrLoseCard from '../WinOrLoseCard'

import './index.css'

class EmojiGame extends Component {
  state = {
    clickedEmojiList: [],
    isGameInProgress: true,
    topScore: 0,
  }

  resetGame = () => {
    // Reset the game state
    this.setState({clickedEmojiList: [], isGameInProgress: true})
  }

  renderScoreCard = () => {
    const {emojisList} = this.props
    const {clickedEmojiList} = this.state
    const isWon = clickedEmojiList.length === emojisList.length

    // Render WinOrLoseCard based on game result
    return (
      <WinOrLoseCard
        isWon={isWon}
        onClickPlayAgain={this.resetGame}
        score={clickedEmojiList.length}
      />
    )
  }

  finishGameAndSetTopScore = currentScore => {
    const {topScore} = this.state
    let newTopScore = topScore

    // Update top score if current score is greater
    if (currentScore > topScore) {
      newTopScore = currentScore
    }

    // Set top score and end the game
    this.setState({topScore: newTopScore, isGameInProgress: false})
  }

  clickEmoji = id => {
    const {emojisList} = this.props
    const {clickedEmojiList} = this.state
    const isEmojiPresent = clickedEmojiList.includes(id)
    const clickedEmojisLength = clickedEmojiList.length

    if (isEmojiPresent) {
      // Finish the game and set the top score
      this.finishGameAndSetTopScore(clickedEmojisLength + 1)
    } else {
      // Check if the game is completed
      if (clickedEmojiList.length + 1 === emojisList.length) {
        this.finishGameAndSetTopScore(emojisList.length)
      }

      // Update clicked emojis list
      this.setState(prevState => ({
        clickedEmojiList: [...prevState.clickedEmojiList, id],
      }))
    }
  }

  getShuffledEmojisList = () => {
    const {emojisList} = this.props

    // Shuffle the emojis list
    return emojisList.sort(() => Math.random() - 0.5)
  }

  renderEmojisList = () => {
    const shuffledEmojisList = this.getShuffledEmojisList()

    // Render the shuffled emojis list
    return (
      <ul className="emojis-list-container">
        {shuffledEmojisList.map(emoji => (
          <EmojiCard
            key={emoji.id}
            emojiDetails={emoji}
            clickEmoji={this.clickEmoji}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {isGameInProgress, clickedEmojiList, topScore} = this.state

    return (
      <div className="app-container">
        <NavBar
          currentScore={clickedEmojiList.length}
          isGameInProgress={isGameInProgress}
          topScore={topScore}
        />

        <div className="emoji-game-body">
          {isGameInProgress ? this.renderEmojisList() : this.renderScoreCard()}
        </div>
      </div>
    )
  }
}

export default EmojiGame
