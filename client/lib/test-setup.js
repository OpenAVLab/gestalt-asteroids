import {expect as exp} from 'chai'
import React from 'react'
import enz, {shallow as shall} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

export const adapter = new Adapter()
enz.configure({adapter})

export const enzyme = enz
export const shallow = shall
export const expect = exp
