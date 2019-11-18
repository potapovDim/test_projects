const buildRequest = require('./lib')

class ReportServiceClient {
  constructor(host) {
    this.request = buildRequest(host)
  }

  async addRunStatistic(body) {
    return this.request.post({path: '/add-run-statistics', body})
  }

  async getRunStatistic() {
    return this.request.get({path: '/get-run-statistics'})
  }

  async getReportConfig() {
    return this.request.get({path: '/get-report-config'})
  }

  async setReportConfig(body) {
    return this.request.post({path: '/set-report-config', body}))
  }

  async getTestCases() {
    return this.request.get({path: '/get-test-cases'})
  }

  async addNewCase(body) {
    return this.request.post({path: '/add-new-case', body})
  }
}
