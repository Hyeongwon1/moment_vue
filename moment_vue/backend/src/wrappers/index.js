class Wrapper {
  constructor(obj) {
    if (obj instanceof Object) {
      Object.assign(this, obj.toJSON())
    } else {
      Object.assign(this, JSON.parse(obj))
    }
  }

  static create(obj) {
    if (!obj) {
      return null
    }
    
    return new Wrapper(obj)
  }

  toJSON() {
    return this
  }

  // toWeb() {
  //   return this
  // }
  toWeb() {
    const values = Object.assign({}, this)
    delete values.password

    return values
  }
}

export default Wrapper