import React from 'react';
import parser, { Tag } from 'bbcode-to-react';

const bbcode = parser

class H1Tag extends Tag {
  toReact() {
    return (
      <div className='h1_tag'>
        <h1>{this.getComponents()}</h1>
      </div>
    )
  }
}

class H2Tag extends Tag {
  toReact() {
    return (
      <div className='h2_tag'>
        <h2>{this.getComponents()}</h2>
      </div>
    )
  }
}

class H3Tag extends Tag {
  toReact() {
    return (
      <div className='h3_tag'>
        <h3>{this.getComponents()}</h3>
      </div>
    )
  }
}

class PTag extends Tag {
  toReact() {
    return (
      <p>{this.getComponents()}</p>
    )
  }
}

class UlTag extends Tag {
  toReact() {
    return (
      <ul>{this.getComponents()}</ul>
    )
  }
}

class OlTag extends Tag {
  toReact() {
    return (
      <ol>{this.getComponents()}</ol>
    )
  }
}

class LiTag extends Tag {
  toReact() {
    return (
      <li>{this.getComponents()}</li>
    )
  }
}

class StrikeTag extends Tag {
  toReact() {
    return (
      // @ts-ignore
      <strike>{this.getComponents()}</strike>
    )
  }
}

class ImgTag extends Tag {
  toReact() {
    return (
      <div className='img_tag' >
        <img src={this.getComponents().toString()} alt="" />
      </div>
    )
  }
}

class SpoilerTag extends Tag {
  toReact() {
    return (
      <p className='spoiler_tag'>{this.getComponents()}</p>
    )
  }
}

class BrTag extends Tag {
  toReact() {
    return <br />
  }
}

// @ts-ignore
bbcode.registerTag('h1', H1Tag)
// @ts-ignore
bbcode.registerTag('h2', H2Tag)
// @ts-ignore
bbcode.registerTag('h3', H3Tag)
// @ts-ignore
bbcode.registerTag('img', ImgTag)
// @ts-ignore
bbcode.registerTag('strike', StrikeTag)
// @ts-ignore
bbcode.registerTag('spoiler', SpoilerTag)
// @ts-ignore
bbcode.registerTag('p', PTag)
// @ts-ignore
bbcode.registerTag('br', BrTag)
// @ts-ignore
bbcode.registerTag('list', UlTag)
// @ts-ignore
bbcode.registerTag('olist', OlTag)
// @ts-ignore
bbcode.registerTag('*', LiTag)

export default bbcode;
