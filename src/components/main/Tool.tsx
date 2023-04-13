import React, { useState } from 'react'
import { AiOutlineFileSearch } from 'react-icons/ai'
import { IoIosInformationCircleOutline, IoIosArrowDown } from 'react-icons/io'
import { BiPlus } from 'react-icons/bi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { useSelector, useDispatch } from 'react-redux'
import {
  setScanEffect,
  setGenerateHeadlineEffect,
} from '../../redux/slices/buttonEffectSlice'
import {
  generateHeadlineFetchAPi,
  setIsFindUseSynonyms,
  setIsIncPowerWords,
  setIsMakeQuestion,
  setGoBackToHeadlineSettings,
} from '../../redux/slices/generateHeadlineSlice'
import DualRange from './DualRange'
import ToggleSwitch from './ToggleSwitch'
import StepDotsRange from './StepDotsRange'
import CustomCounter from './CustomCounter'
import DropDown from './DropDown'
import CustomCreateTag from './CustomCreateTag'
import CustomTooltip from './CustomTooltip'
import { ThreeDots } from 'react-loader-spinner'
import { FaRegCopy } from 'react-icons/fa'
import { BsCheck2 } from 'react-icons/bs'
import toast, { Toaster } from 'react-hot-toast'
import classNames from 'classnames'
import { Nullable } from '../../utils/types/types'
import { AppDispatch, RootState } from '../../redux/store/store'
import { setHeadlineLength } from '../../redux/slices/RangeSliderSlice'

const Tool = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    scanEffect,
    generateHeadlineEffect,
    headlineLength,
    headlineType,
    isFindUseSynonyms,
    isIncPowerWords,
    isMakeQuestion,
    count,
    allTitles,
    isLoading,
    goBackToSettings,
  } = useSelector((state: RootState) => ({
    scanEffect: state.ButtonEffectSlice.scanEffect,
    generateHeadlineEffect: state.ButtonEffectSlice.generateHeadlineEffect,
    headlineLength: state.RangeSliderSlice.headlineLength,
    headlineType: state.RangeSliderSlice.headlineType,
    isFindUseSynonyms: state.GenerateHeadlineSlice.isFindUseSynonyms,
    isIncPowerWords: state.GenerateHeadlineSlice.isIncPowerWords,
    isMakeQuestion: state.GenerateHeadlineSlice.isMakeQuestion,
    goBackToSettings: state.GenerateHeadlineSlice.goBackToSettings,
    isLoading: state.GenerateHeadlineSlice.isLoading,
    allTitles: state.GenerateHeadlineSlice.allTitles,
    count: state.CounterSlice.count,
  }))
  const [hasArticle, setHasArticle] = useState('')
  const [hasFocusedHeadline, setHasFocusedHeadline] = useState<string>('')
  const [edit, setEdit] = useState(true)
  const [expIncHeadline, setExpIncHeadline] = useState(false)
  const [expExcHeadline, setExpExcHeadline] = useState(false)
  const [includeTag, setIncludeTag] = useState<string[] | []>([])
  const [excludeTag, setExcludeTag] = useState<string[]>([])
  const [copySuccess, setCopySuccess] = useState<{
    copied: boolean
    id: Nullable<number>
  }>({
    copied: false,
    id: null,
  })
  // const [goBackToSettings, setGoBackToHeadlineSettings] = useState(true)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setHasArticle(e.target.value)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(
      generateHeadlineFetchAPi({
        heading_type: 'emotional and controvery',
        paragraph: hasFocusedHeadline,
        num_headers: count,
      })
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Toaster position="top-right" reverseOrder={false} />
        <main className="flex justify-center">
          <div className="flex w-full max-w-7xl my-5">
            <div className="w-full h-full px-3 flex flex-col gap-3 justify-self-stretch items-stretch">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-[20px]">Article Text</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="">
                  <p className="font-semibold text-[14px]">
                    Scan for Controversy & Emotion
                  </p>
                  <p className="text-[12px] text-[#aab2b8]">
                    Find controversial & emotional part based on your articale
                    text
                  </p>
                </div>
                <button
                  disabled={hasArticle.trim() === ''}
                  type="button"
                  className={classNames(
                    'flex gap-1 px-2 py-2 bg-[#2E90FA] h-9 rounded-md cursor-pointer shadow-lg disabled:cursor-not-allowed disabled:bg-[#a8d1df]',
                    scanEffect && 'animate-wiggle'
                  )}
                  onClick={(e) => {
                    dispatch(setScanEffect(true))
                    setHasArticle(hasArticle)
                    setEdit(false)
                  }}
                  onAnimationEnd={() => {
                    dispatch(setScanEffect(false))
                  }}
                >
                  <AiOutlineFileSearch size={18} fill="white" />
                  <p className="text-white text-[12px] font-semibold">
                    Scan for Controversy & Emotion
                  </p>
                </button>
              </div>
              {edit ? (
                <div className="flex flex-col gap-2 group">
                  <label className="font-semibold">
                    Put your article text below
                  </label>
                  <textarea
                    className="resize-none h-full w-full p-3 border-[1px] rounded-md border-solid border-[#f8f8f8] text-[14px] focus:outline-none focus:border-[1px] focus:border-solid focus:border-[#aab2b8] focus:rounded-md scrollbar-thumb-transparent scrollbar-track-transparent group-hover:scrollbar-thumb-[#c3c3c3] group-hover:scrollbar-track-[#ededed] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-opacity-0.3"
                    rows={18}
                    id="paragraph"
                    name="paragraph"
                    value={hasArticle}
                    placeholder="Type in or copy and paste your text/articale"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              ) : (
                <div>
                  <DropDown
                    data={hasArticle}
                    setFocused={setHasFocusedHeadline}
                  />
                </div>
              )}
            </div>
            <div className="w-full px-3 bg-[#f6f8f9]">
              {goBackToSettings && (
                <div className="m-5 px-3 py-2 bg-white rounded-md">
                  <div>
                    <p className="font-semibold text-[22px]">
                      Generate your headline
                    </p>
                  </div>
                  <div className="flex flex-col justify-between py-3 border-solid border-b-[1px] border-[#f8f8f8]">
                    <div className="flex justify-between w-full">
                      <div>
                        <p className="font-semibold text-[16px]">
                          Hedline Focus
                        </p>
                        <p className="font-normal text-[12px] text-[#aab2b8]">
                          Text to focus on headline
                        </p>
                      </div>
                      <button>
                        <BiPlus size={20} fill="#48535B" />
                      </button>
                    </div>
                    {hasFocusedHeadline !== '' && (
                      <div className="flex my-2 justify-between">
                        <div className="border-[1px] rounded-md border-solid border-[#f8f8f8] p-2">
                          <p className="font-normal text-[10px] text-[#252728]">
                            {hasFocusedHeadline}
                          </p>
                        </div>
                        <div className="px-2">
                          <button
                            onClick={() => {
                              setHasFocusedHeadline('')
                            }}
                          >
                            <RiDeleteBinLine size={15} fill="#48535B" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between flex-col py-3 border-solid border-b-[1px] border-[#f8f8f8]">
                    <div
                      className="flex justify-between w-full"
                      onClick={() => setExpIncHeadline(!expIncHeadline)}
                    >
                      <div>
                        <p className="font-semibold text-[16px]">
                          Include specific words on headline
                        </p>
                      </div>
                      <button
                        className={classNames(
                          'transition-all ease-in-out duration-500',
                          expIncHeadline
                            ? 'rotate-45 fill-[#48535B]'
                            : 'rotate-0'
                        )}
                      >
                        <BiPlus size={20} fill="#48535B" />
                      </button>
                    </div>
                    <section
                      className={classNames(
                        'overflow-hidden transition-all ease-in-out duration-500 my-2',
                        expIncHeadline ? 'max-h-[100px] ' : 'max-h-[0px]'
                      )}
                    >
                      <CustomCreateTag
                        tags={includeTag}
                        setTags={setIncludeTag}
                      />
                    </section>
                  </div>
                  <div className="flex justify-between flex-col py-3 border-solid border-b-[1px] border-[#f8f8f8]">
                    <div
                      className="flex justify-between w-full"
                      onClick={() => setExpExcHeadline(!expExcHeadline)}
                    >
                      <div>
                        <p className="font-semibold text-[16px]">
                          Exclude specific words on headline
                        </p>
                      </div>
                      <button
                        className={classNames(
                          'transition-all ease-in-out duration-500',
                          expIncHeadline
                            ? 'rotate-45 fill-[#48535B]'
                            : 'rotate-0'
                        )}
                      >
                        <BiPlus size={20} fill="#48535B" />
                      </button>
                    </div>
                    <section
                      className={classNames(
                        'overflow-hidden transition-all ease-in-out duration-500',
                        expIncHeadline ? ' max-h-[130px]' : 'max-h-[0px]'
                      )}
                    >
                      <CustomCreateTag
                        tags={excludeTag}
                        setTags={setExcludeTag}
                      />
                      <div className="flex gap-2 mt-2">
                        <ToggleSwitch
                          toggle={isFindUseSynonyms}
                          setToggle={setIsFindUseSynonyms}
                        />
                        <p className="font-[600] text-[16px] leading-[22px] text-[#252728]">
                          Find & use synonyms for Facebook, Twitter
                        </p>
                      </div>
                    </section>
                  </div>
                  <div className="flex flex-col gap-3 w-full justify-between py-3 border-solid border-b-[1px] border-[#f8f8f8]">
                    <div className="flex justify-between">
                      <div className="flex">
                        <p className="font-semibold text-[16px]">
                          Length of Headline
                        </p>
                      </div>
                      <div className="flex justify-center items-center gap-2">
                        <div className="flex justify-between items-center">
                          <div className="flex gap-1">
                            {' '}
                            Min
                            <div className="bg-[#f0f2f3] px-1 rounded-md min-w-[32px] flex items-center justify-center">
                              <p className="font-[500] text-[16px] leading-[24px] text-[#252728]">
                                {headlineLength[0]}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-[180px]">
                          <DualRange
                            defaultValue={headlineLength}
                            setRange={setHeadlineLength}
                            min={0}
                            max={150}
                            step={10}
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-1">
                            {' '}
                            Max
                            <div className="bg-[#f0f2f3] px-1 rounded-md min-w-[32px] flex items-center justify-center">
                              <p className="font-[500] text-[16px] leading-[24px] text-[#252728]">
                                {headlineLength[headlineLength.length - 1]}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ToggleSwitch
                        toggle={isIncPowerWords}
                        setToggle={setIsIncPowerWords}
                      />
                      <p className="font-[600] text-[16px] leading-[22px] text-[#252728]">
                        Include Power Words in the headline
                      </p>
                      <CustomTooltip tooltip="By including above words can add more power to content">
                        <IoIosInformationCircleOutline
                          size={20}
                          fill="#B0BABF"
                        />
                      </CustomTooltip>
                    </div>
                    <div className="flex gap-2">
                      <ToggleSwitch
                        toggle={isMakeQuestion}
                        setToggle={setIsMakeQuestion}
                      />
                      <p className="font-[600] text-[16px] leading-[22px] text-[#252728]">
                        Make the headline as a question
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex">
                        <p className="font-semibold text-[16px]">
                          Headline Range
                        </p>
                      </div>
                      <div className="flex justify-center items-center gap-2">
                        <div className="flex justify-between items-center">
                          <div className="flex gap-1">
                            <p className="bg-[#f0f2f3] px-1 rounded-md font-[500] text-[16px] leading-[24px] text-[#252728]">
                              Neutral
                            </p>
                          </div>
                        </div>
                        <div className="w-[180px]">
                          <StepDotsRange
                            defaultValue={headlineType}
                            // setRange={setHeadlineType}
                            min={0}
                            max={40}
                            step={10}
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-1 ">
                            <p className="bg-[#f0f2f3] px-1 rounded-md font-[600] text-[16px] leading-[24px] text-[#252728]">
                              Sensational
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 justify-between py-3">
                    <div className="custom-counter">
                      <CustomCounter />
                    </div>
                    <button
                      disabled={!hasFocusedHeadline || isLoading}
                      type="submit"
                      className={classNames(
                        'flex items-center justify-center w-full gap-1 px-2 py-2 bg-[#2E90FA] h-9 rounded-md cursor-pointer shadow-lg disabled:cursor-not-allowed disabled:bg-[#a8d1df] text-white text-[12px] font-semibold',
                        generateHeadlineEffect && 'animate-wiggle'
                      )}
                      onClick={() => {
                        dispatch(setGenerateHeadlineEffect(true))
                      }}
                      onAnimationEnd={() => {
                        dispatch(setGenerateHeadlineEffect(false))
                      }}
                    >
                      {!isLoading ? (
                        'Generate Headlines'
                      ) : (
                        <ThreeDots
                          height="40"
                          width="40"
                          radius="9"
                          color="#fafafa"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{}}
                          // wrapperClassName=""
                          visible={true}
                        />
                      )}
                    </button>
                  </div>
                </div>
              )}
              {isLoading === false &&
                allTitles !== null &&
                !goBackToSettings && (
                  <div className="px-6 py-4 cursor-pointer">
                    <div
                      onClick={() => {
                        dispatch(setGoBackToHeadlineSettings(!goBackToSettings))
                        setCopySuccess({
                          copied: false,
                          id: null,
                        })
                      }}
                      className="my-2 px-3 py-2 bg-white rounded-md"
                    >
                      <div className="flex justify-start items-center">
                        <p className="flex items-center gap-2 font-semibold text-base text-[#2E90FA]">
                          <IoIosArrowDown /> Show headline settings
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-[22px]">
                      {allTitles.length < 0 ? 'No' : allTitles.length} Headline
                      Generated
                    </p>
                    <div className="flex flex-col gap-3 py-2">
                      {allTitles.map((title: string, id: number) => (
                        <div
                          key={id}
                          className="p-2 shadow-lg bg-white rounded-md flex justify-between"
                        >
                          <div className="flex flex-col">
                            <p className="font-medium text-base text-[#252728] cursor-default">
                              {title.replace(/[0-9).]/g, '')}
                            </p>
                            <p className="font-normal text-sm text-[#677580]">
                              {title.length} Characters
                            </p>
                          </div>
                          <div>
                            <button
                              type="button"
                              onClick={(e) => {
                                navigator.clipboard.writeText(
                                  title.replace(/[0-9).]/g, '')
                                )
                                setCopySuccess({ copied: true, id: id })
                                toast.success('Copied!')
                              }}
                            >
                              {copySuccess.id === id ? (
                                <div className="flex items-center justify-center px-2 py-1 bg-white rounded-[4px] shadow-sm">
                                  <p className="flex justify-center items-center gap-1 font-semibold text-xs text-[#252728]">
                                    <BsCheck2 />
                                    copied
                                  </p>
                                </div>
                              ) : (
                                <div className="flex items-center justify-center px-2 py-1 bg-[#2E90FA] rounded-[4px] shadow-sm">
                                  <p className="flex justify-center items-center gap-1 font-semibold text-xs text-white">
                                    <FaRegCopy />
                                    copy
                                  </p>
                                </div>
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </main>
      </form>
    </div>
  )
}

export default Tool
