import { useState, useEffect } from 'react'
import { Layout, Space } from 'antd';
import { Switch } from 'antd';
import { BulbOutlined, BulbFilled, GithubFilled, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { ConfigProvider, theme, Card, Button, Input, List, DatePicker, Select } from "antd";
import DynamicTable from './Journal.jsx';
import DynamicLedger from './Ledger.jsx';
import DynamicTrialBalance from './Trialbalance.jsx';
import "./App.css"

const { Header, Footer, Sider, Content } = Layout;

function App() {
	const { defaultAlgorithm, darkAlgorithm } = theme;
	const [isDarkMode, setIsDarkMode] = useState(true);
	const [inputValueAssets, setInputValueAssets] = useState('');
	const [listItemsAssets, setListItemsAssets] = useState([]);
	const [inputValueLiab, setInputValueLiab] = useState('');
	const [listItemsLiab, setListItemsLiab] = useState([]);
	const [inputValueOE, setInputValueOE] = useState('');
	const [listItemsOE, setListItemsOE] = useState([]);
	const [journalData, setJournalData] = useState([]);

	useEffect(() => {
		// Retrieve data from local storage on page load
		const storedAssets = localStorage.getItem('assets');
		const storedLiabilities = localStorage.getItem('liabilities');
		const storedEquity = localStorage.getItem('equity');
		const storedJournal = localStorage.getItem('journal');

		if (storedAssets) {
			setListItemsAssets(JSON.parse(storedAssets));
		}
		if (storedLiabilities) {
			setListItemsLiab(JSON.parse(storedLiabilities));
		}
		if (storedEquity) {
			setListItemsOE(JSON.parse(storedEquity));
		}
	}, []);

	const handleSaveData = () => {
		// Save data to local storage
		localStorage.setItem('assets', JSON.stringify(listItemsAssets));
		localStorage.setItem('liabilities', JSON.stringify(listItemsLiab));
		localStorage.setItem('equity', JSON.stringify(listItemsOE));
		localStorage.setItem('journal', JSON.stringify(journalData));
	};

	const handleClearData = () => {
		// Clear data from local storage and state
		localStorage.clear();
		setListItemsAssets([]);
		setListItemsLiab([]);
		setListItemsOE([]);
	};

	const handleInputChange = (e) => {
		setInputValueAssets(e.target.value);
	};

	const handleAddItem = () => {
		if (inputValueAssets && inputValueAssets !== '' && !listItemsAssets.includes(inputValueAssets)) {
			setListItemsAssets([...listItemsAssets, inputValueAssets]);
			setInputValueAssets('');
		}
	};

	const handleRemoveItem = (index) => {
		const updatedList = [...listItemsAssets];
		updatedList.splice(index, 1);
		setListItemsAssets(updatedList);
	};

	const handleAddItem2 = () => {
		if (inputValueLiab && inputValueLiab !== '' && !listItemsLiab.includes(inputValueLiab)) {
			setListItemsLiab([...listItemsLiab, inputValueLiab]);
			setInputValueLiab('');
		}
	};

	const handleRemoveItem2 = (index) => {
		const updatedList = [...listItemsLiab];
		updatedList.splice(index, 1);
		setListItemsLiab(updatedList);
	};

	const handleAddItem3 = () => {
		if (inputValueOE && inputValueOE !== '' && !listItemsOE.includes(inputValueOE)) {
			setListItemsOE([...listItemsOE, inputValueOE]);
			setInputValueOE('');
		}
	};

	const handleRemoveItem3 = (index) => {
		const updatedList = [...listItemsOE];
		updatedList.splice(index, 1);
		setListItemsOE(updatedList);
	};

	const handleThemeChange = (checked) => {
		setIsDarkMode(checked);
	};

	const handleJournalData = (data) => {
		setJournalData(data);
		console.log(data);
	};

	return (
		<ConfigProvider
			theme={{
				algorithm: isDarkMode ? defaultAlgorithm : darkAlgorithm,
				token: {
					primary: isDarkMode ? '#ffffff' : '#141414',
					normal: isDarkMode ? '#ffffff' : '#141414',
					disabled: isDarkMode ? '#ffffff' : '#141414',
				},
			}}>
			<Layout className='flex flex-col w-screen'>
				<Header className='main-header'>
					<GithubFilled onClick={() => {
						window.open('https://github.com/abdullahrecon999/Financial-project', '_blank');
					}} style={{ fontSize: 25 }} className={`${(!isDarkMode) ? "hover:text-blue-500 text-white" : "hover:text-gray-800 text-gray-500"} cursor-pointer transition-all hover:scale-110`} />
					<div>
						<Switch
							checked={isDarkMode}
							onChange={handleThemeChange}
							checkedChildren={<BulbFilled />}
							unCheckedChildren={<BulbOutlined />}
						/>
					</div>
				</Header>

				<Content className='flex flex-col w-full px-5 items-center'>
					<div className='flex px-5 w-full mt-10 items-center justify-center'>
						<div className="text-gray-500 text-4xl text-center font-bold uppercase flex flex-col justify-around">
							<span>Make</span>
							<div className="overflow-hidden h-14">
								<div className="animate-slide"><span className="inline-block text-white py-1 px-3 mt-1 mb-11 bg-blue-500">General Journal</span></div>
								<div><span className="inline-block text-white py-1 px-3 mb-11 bg-green-500">Ledger</span></div>
								<div><span className="inline-block text-white py-1 px-3 mb-11 bg-red-500">Trail Balance</span></div>
							</div>
							<span>AweSoMe!</span>
						</div>
					</div>

					<p className='text-2xl bg-stone-700 font-bold w-fit px-2 py-1 mt-10 mb-5 text'>I n t r o d u c t i o n</p>
					<p className="text-md font-bold text-gray-400 text-center">
						Welcome to the General Journal App! To create a new journal entry, please follow these instructions:<br />
						Enter the relevant data for the transaction. Highlight the <span class="text-blue-500">assets</span> involved, the <span class="text-red-500">liabilities</span> associated, and any changes to <span class="text-green-500">equity</span>.<br />
						Ensure that the journal entry is balanced. The total of the debits (assets and expenses) should equal the total of the credits (liabilities, equity, and revenue).<br />
						Remember, <span class="text-blue-500">assets</span> represent what the company owns, <span class="text-red-500">liabilities</span> represent what the company owes, and <span class="text-green-500">equity</span> represents the owner's interest in the business. Happy journaling!
					</p>

					<div className='flex w-full pt-10 justify-around'>
						<div className='bg-white rounded-md shadow-md px-3 py-2'>
							<div className='flex flex-col items-center text-gray-500 text-2xl font-bold'>
								<span className='mb-4'>Assets</span>
								<div className='rounded-md'>
									<div>
										<Input
											placeholder="Enter an Asset"
											value={inputValueAssets}
											onChange={handleInputChange}
											onPressEnter={handleAddItem}
											addonAfter={null}
											className='text-lg font-semibold shadow-md'
										/>
										<List
											dataSource={listItemsAssets}
											renderItem={(item, index) => (
												<List.Item
													bordered
													actions={[
														<Button
															type="text"
															icon={<DeleteOutlined />}
															onClick={() => handleRemoveItem(index)}
														/>
													]}
												>
													<p className='pl-5 font-bold text-gray-500 text-lg'>{item}</p>
												</List.Item>
											)}
										/>
									</div>
								</div>
							</div>
						</div>

						<div className='bg-white rounded-md shadow-md px-3 py-2'>
							<div className='flex flex-col items-center text-gray-500 text-2xl font-bold'>
								<span className='mb-4'>Liability</span>
								<div className='rounded-md'>
									<div>
										<Input
											placeholder="Enter a Liability"
											value={inputValueLiab}
											onChange={(e) => setInputValueLiab(e.target.value)}
											onPressEnter={handleAddItem2}
											addonAfter={null}
											className='text-lg font-semibold shadow-md'
										/>
										<List
											dataSource={listItemsLiab}
											renderItem={(item, index) => (
												<List.Item
													bordered
													actions={[
														<Button
															type="text"
															icon={<DeleteOutlined />}
															onClick={() => handleRemoveItem2(index)}
														/>
													]}
												>
													<p className='pl-5 font-bold text-gray-500 text-lg'>{item}</p>
												</List.Item>
											)}
										/>
									</div>
								</div>
							</div>
						</div>

						<div className='bg-white rounded-md shadow-md px-3 py-2'>
							<div className='flex flex-col items-center text-gray-500 text-2xl font-bold'>
								<span className='mb-4'>Owner's Equity</span>
								<div className='rounded-md'>
									<div>
										<Input
											placeholder="Enter an Owner's Equity"
											value={inputValueOE}
											onChange={(e) => setInputValueOE(e.target.value)}
											onPressEnter={handleAddItem3}
											addonAfter={null}
											className='text-lg font-semibold shadow-md'
										/>
										<List
											dataSource={listItemsOE}
											renderItem={(item, index) => (
												<List.Item
													bordered
													actions={[
														<Button
															type="text"
															icon={<DeleteOutlined />}
															onClick={() => handleRemoveItem3(index)}
														/>
													]}
												>
													<p className='pl-5 font-bold text-gray-500 text-lg'>{item}</p>
												</List.Item>
											)}
										/>
									</div>
								</div>
							</div>
						</div>

						<div className='flex flex-col justify-center gap-4 sticky top-20 h-20'>
							<button onClick={handleSaveData} className="btn btn-success">
								<svg className='h-6 w-6' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M27.71 9.29l-5-5A1 1 0 0 0 22 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V10a1 1 0 0 0-.29-.71zM12 6h8v4h-8zm8 20h-8v-8h8zm2 0v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8H6V6h4v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6.41l4 4V26z" fill="currentColor"></path></svg>
								Save
							</button>
							<button onClick={handleClearData} className="btn btn-outline btn-error">
								<svg className='h-6 w-6' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><defs></defs><path d="M899.1 869.6l-53-305.6H864c14.4 0 26-11.6 26-26V346c0-14.4-11.6-26-26-26H618V138c0-14.4-11.6-26-26-26H432c-14.4 0-26 11.6-26 26v182H160c-14.4 0-26 11.6-26 26v192c0 14.4 11.6 26 26 26h17.9l-53 305.6c-.3 1.5-.4 3-.4 4.4c0 14.4 11.6 26 26 26h723c1.5 0 3-.1 4.4-.4c14.2-2.4 23.7-15.9 21.2-30zM204 390h272V182h72v208h272v104H204V390zm468 440V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H416V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H202.8l45.1-260H776l45.1 260H672z" fill="currentColor"></path></svg>
								Clear All
							</button>
						</div>
					</div>

					<div className='flex flex-col w-full min-h-96 items-center'>
						<p className='text-2xl bg-stone-700 font-bold w-fit px-2 py-1 mt-10 mb-5 text'>G e n e r a l - J o u r n a l</p>

						<div className=' rounded-md flex flex-col items-center w-full'>
							<DynamicTable assets={listItemsAssets} liabilities={listItemsLiab} ownersEquity={listItemsOE} data={handleJournalData} />
						</div>

						<p className='text-2xl bg-stone-700 font-bold w-fit px-2 py-1 mt-10 mb-5 text'>L e d g e r</p>
						<div className='text-black rounded-md  w-full px-32'>
							{
								journalData.length > 0 ? (
									<div className='rounded-lg bg-white p-10 shadow-lg'>
										<DynamicLedger data={journalData} />
									</div>
								) : (
									<p className='text-2xl text-gray-500 font-bold'>No Data</p>
								)
							}
						</div>

						<p className='text-2xl bg-stone-700 font-bold w-fit px-2 py-1 mt-10 mb-5 text'>T r i a l - B a l a n c e</p>
						<div className='text-black rounded-md  w-full px-32 mb-10'>
							{
								journalData.length > 0 ? (
									<div className='rounded-lg bg-white p-10 shadow-lg'>
										<DynamicTrialBalance data={journalData} />
									</div>
								) : (
									<p className='text-2xl text-gray-500 font-bold'>No Data 2</p>
								)
							}
						</div>
					</div>
				</Content>
			</Layout>
		</ConfigProvider>
	)
}

export default App
