// * Do not change the boilerplate sections if you don't know what you're doing
// * Make sure that your code does not crash OUTSIDE of try-catch test blocks, otherwise no test will pass.
// * process.env.USER_CODE_DIR is the directory path of user's code. Use it to import/run user specific code (static analysis of user files?)
// * process.env.PUBLIC_PORT is the publicly accessible port on localhost for user's server. Use it to perform HTTP requests to user server
// * process.env.UNIT_TEST_OUTPUT_FILE is the name of the file where results of UNIT tests should be put
// * The results file should have a JSON array with ONLY "true" or "false" values (booleans) as elements having one-to-one correspondance to challenges you design

// !! Boilerplate code starts
const fs = require('fs')
const assert = require('assert')
const path = require('path')
const spawn = require('child_process').spawn
const execSync = require('child_process').execSync
const fetch = require('node-fetch')

async function run() {
    // results[] is mapped to results shown to user
	const results = []
	
	let testNum = 0

	try {
		execSync(`cd ${process.env.USER_CODE_DIR} && git checkout main`).toString()

		// test case passes
		console.log(`Test #${testNum++} passed!`) // this will appear to user on frontend
		results.push(true)
	} catch (error) {
		console.log(`Test #${testNum++} failed!`, 'Are you sure your folder is a git repo with "main" branch present?') // this will appear to user on frontend
		results.push(false)
	}
	
	try {
		// example: 
		const output = execSync(`cd ${process.env.USER_CODE_DIR} && git config --get remote.origin.url`).toString()
		assert(output.length > 2)
		
		// test case passes
		console.log(`Test #${testNum++} passed!`) // this will appear to user on frontend
		results.push(true)
	} catch (error) {
		console.log(`Test #${testNum++} failed!`, 'Could not find any "origin" named remote. Confirm by writing git remote -v in CLI') // this will appear to user on frontend
		results.push(false)
	}
	
	try {
		// example: 
		const output = execSync(`cd ${process.env.USER_CODE_DIR} && git ls-remote`).toString()
		assert(output.length > 2)
		
		// test case passes
		console.log(`Test #${testNum++} passed!`) // this will appear to user on frontend
		results.push(true)
	} catch (error) {
		console.log(`Test #${testNum++} failed!`, 'Could not read from remote repository. Make sure you have pushed your code to remote and it is a real repository') // this will appear to user on frontend
		results.push(false)
	}
	
	
	// End your tests here
	
    // Write the test results to disk
	fs.writeFileSync(process.env.UNIT_TEST_OUTPUT_FILE, JSON.stringify(results))
	// !! Boilerplate code starts
	
	// No time for cleanup, this container will be destroyed in a few milliseconds anyway
	process.exit(0)
}
run()
// !! Boilerplate code ends