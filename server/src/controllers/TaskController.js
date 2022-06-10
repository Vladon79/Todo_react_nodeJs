import Task from '../models/Task.js'

class TaskController {
  async create (req, res) {
    try {
      const { name, isChecked, type, data, userEmail, userId } = req.body
      const createTask = await Task.create({ name, isChecked, type, data, userEmail, userId })
      res.status(200).json(createTask)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async getAll (req, res) {
    try {
      const pageCount = req.query.pageCount || 5
      const page = req.query.page || 1
      const findByName = req.query.findByName === undefined ? '' : req.query.findByName
      const findMethod = req.query.findMethod
      let findName
      if (findByName !== '' && findMethod === 'Contains') {
        findName = new RegExp(findByName)
      } else if (findByName !== '' && findMethod === 'Equals') {
        findName = new RegExp('^' + findByName + '[\\w+]', 'i')
      } else {
        findName = null
      }

      let sortName
      const filter = req.query.filter
      const sort = req.query.sort
      if (sort === 'AscName') {
        sortName = { name: 1 }
      } else if (sort === 'DescName') {
        sortName = { name: -1 }
      } else if (sort === 'AscData') {
        sortName = { data: -1 }
      } else if (sort === 'DescData') {
        sortName = { data: 0 }
      } else {
        sortName = null
      }

      let find
      if (filter === 'Active') {
        find = { isChecked: false }
      } else if (filter === 'Completed') {
        find = { isChecked: true }
      } else {
        find = null
      }

      const findO = findName !== null ? { ...find, name: findName } : { ...find } || null
      const tasksCount = await Task.find(findO).count()
      const tasks = await Task.find(findO)
        .skip(pageCount * (page - 1))
        .limit(pageCount)
        .sort(sortName || null)
      return res.json({ tasks, tasksCount, pageCount, page, filter })
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async findCount (req, res) {
    try {
      const tasks = await Task.find().count()
      return res.json(tasks)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async delete (req, res) {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(400).json({ message: 'id not specified' })
      }
      const task = await Task.findByIdAndDelete(id)
      return res.json(task)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async update (req, res) {
    try {
      const task = req.body
      if (!task._id) {
        return res.status(400).json({ message: 'id not specified' })
      }
      const updateTask = await Task.findByIdAndUpdate(task._id, task, {
        new: true
      })
      return res.json(updateTask)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

export default new TaskController()
