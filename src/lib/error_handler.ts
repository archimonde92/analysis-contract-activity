import { IS_DEBUG, SERVER_CODE } from "../config"
import { HTTP_ERROR_CODE } from "./http-error"

type TCaptureExecption = (e: any, data: any, debug: boolean) => Promise<string>

let defaultCaptureException: TCaptureExecption | undefined

export const setCaptureException: (newCaptureException: TCaptureExecption) => void = (new_capture_exception) => {
    defaultCaptureException = new_capture_exception
}

export const genCodeName = (msg: string, add_msg?: string) => `${SERVER_CODE}:${msg} ${ErrCodeMessage[SERVER_CODE + msg]} ${add_msg || ""}`

export const ErrMsg = (msg: string, add_msg?: string) => {
    const gen = genCodeName(msg, add_msg)
    return new Error(gen)
}
export const validateMissing = (object: any) => {
    for (let el in object) {
        if (object[el] === null || object[el] === undefined || object[el] === "") throw ErrMsg(ERROR_CODE.MISSING_PARAMS, el)
    }
}

export const isInternalErrorCode = (e: any) => {
    let { message } = e
    return message.startsWith(`${SERVER_CODE}:`)
}

/**
 * Show the error and capture exception to Sentry
 * @param e error 
 * @param args params of user 
 * @param funcName Name of function
 */

export function ErrorHandler(e: any, args: any, funcName: string, captureException: TCaptureExecption | undefined = defaultCaptureException) {
    let { message } = e
    if (!message) message = ""
    const { password, ...params } = args
    if (message.startsWith(`${SERVER_CODE}:`)) {
        if (IS_DEBUG) {
            const errCode = message.substring(0, SERVER_CODE.length) + message.substring(SERVER_CODE.length + 1);
            console.log('\n========================================================================================\n')
            console.log('\x1b[33m%s\x1b[0m', `⚠️  WARNING : EXPECTED ERROR HAPPENED!\n`)
            console.log('Function:', funcName)
            console.log(`Argument:`, JSON.parse(JSON.stringify(params)))
            console.log(`Message:`, ErrCodeMessage[errCode] ? ErrCodeMessage[errCode] : message.substring(SERVER_CODE.length + 1))
            console.log(`Stack:`, e.stack)
            console.log('\n========================================================================================')
        }
    } else {
        console.log('\n========================================================================================\n')
        console.log('\x1b[31m%s\x1b[0m', `🔥  🔥  🔥  DANGER : UNEXPECTED ERROR HAPPENED!\n `)
        console.log('Function:', funcName)
        console.log(`Argument:`, JSON.parse(JSON.stringify(params)))
        console.log(`Stack:`, e?.stack || e)
        console.log('\n========================================================================================')
        if (captureException) {
            captureException(e, { args: JSON.parse(JSON.stringify(args)) }, false)
        }
    }
    return {
        throwError: () => { throw new Error(e) }
    }
}

const ErrCodeMessage = {
    RLS000: "UNEXPECTED_ERROR",
    RLS100: "SIGNATURE_INVALID",
    RLS101: "AUTHORIZATION_REQUIRED",
    RLS102: "HEADER_ADDRESS_REQUIRED",
    RLS103: "ADMIN_REQUIRED",
    RLS104: "SIGNATURE_OUTDATE",

    RLS200: "SIGNATURE_INVALID",
    RLS201: "DOMAIN_NOT_EXIST",
    RLS202: "MUST_APPROVE_FIRST",
    RLS203: "INSUFFICIENT_WTRX",
    RLS204: "INVALID_API_KEY",
    RLS205: "INSUFFICIENT_BALANCE",
    RLS206: "INVALID_PAYMENT_METHOD",

    RLS212: "ADDRESS_INVALID",
    RLS213: "DURATION_INVALID",
    RLS214: "AlREADY_MINT_WTRX",
    RLS215: "USER_HAS_SET_PERMIT",
    RLS216: "PERMISSION_INVALID",
    RLS217: "USER_PERMISSION_NOT_EXIST",
    RLS218: "TRANSACTION_ID_ALREADY_EXISTS",
    RLS219: "NON_OWNER_TRANSACTION",
    RLS220: "ORDER_REQUEST_NOT_EXISTS",
    RLS221: "FEE_LIMIT_TOO_HIGH",
    RLS222: "ORDER_REQUEST_CAN_NOT_CANCEL",
    RLS223: "PARAMS_NOT_MATCH_TRANSACTION",

    RLS400: "MISSING_PARAMS",
    RLS401: "INVALID_PAGE",
    RLS402: "INVALID_PAGESIZE",
    RLS403: "INVALID_VALID_UNTIL_TIME",
    RLS404: "INVALID_ERC20_ADDRESS",
    RLS405: "INVALID_VALUE",
    RLS406: "USER_NOT_EXIST",
    RLS407: "BALANCE_IS_NOT_ENOUGH",
    RLS408: "INVALID_PARAMS",
    RLS409: "PROJECT_NOT_EXISTS",
    RLS410: "PROJECT_NAME_EXISTS",
    RLS412: "TRANSACTION_IS_NOT_VALID_TRANSFER_TRX",
    RLS413: "RATE_LIMIT",
    RLS414: "MIN_TRANSFER_AMOUNT",
    RLS415: "ABI_INVALID",
    RLS416: "RECIPIENT_CONTRACT_NOT_EXISTS",
    RLS417: "RECIPIENT_CONTRACT_ALREADY_EXISTS",
    RLS418: "RECIPIENT_CONTRACT_INVALID",
    RLS419: "METHOD_CALLING_IS_NOT_SUPPORT",
    RLS420: "TRANSACTION_IS_NOT_DELEGATE_RESOURCE",
    RLS421: "TRANSACTION_IS_NOT_VALID_DELEGATE_RESOURCE",
    RLS422: "NOT_SUPPORT_PARTIAL_ORDER",
    RLS423: "ORDER_IS_FULLED",
    RLS424: "DELEGATED_FOR_USER_NOT_AVAILABLE",
    RLS425: "FAST_REQUEST",
    RLS426: "SINGEDTX_EXPIRED",


    RLS501: "SERVER_MAINTAINED",
    RLS502: 'BOT_INSUFFICIENT_BALANCE'
}

export const ERROR_CODE = {
    //==========UNEXPECTED ERROR==========
    UNEXPECTED_ERROR: '000',
    SUCCESS: '001',
    //==========AUTH==============
    AUTHORIZATION_REQUIRED: '101',
    HEADER_ADDRESS_REQUIRED: '102',
    SIGNATURE_OUTDATE: '104',
    NOT_SUPPORT: '105',

    //==========FETCH DATA==========
    SIGNATURE_INVALID: '200',
    DOMAIN_NOT_EXIST: '201',
    MUST_APPROVE_FIRST: "202",
    INSUFFICIENT_WTRX: "203",
    INVALID_API_KEY: "204",
    INSUFFICIENT_BALANCE: "205",
    INVALID_PAYMENT_METHOD: "206",
    ADDRESS_INVALID: '212',
    DURATION_INVALID: '213',
    AlREADY_MINT_WTRX: '214',
    USER_HAS_SET_PERMIT: '215',
    PERMISSION_INVALID: '216',
    USER_PERMISSION_NOT_EXIST: '217',
    TRANSACTION_ID_ALREADY_EXISTS: '218',
    NON_OWNER_TRANSACTION: '219',
    ORDER_REQUEST_NOT_EXISTS: '220',
    FEE_LIMIT_TOO_HIGH: '221',
    ORDER_REQUEST_CAN_NOT_CANCEL: '222',
    PARAMS_NOT_MATCH_TRANSACTION: '223',

    //==========PARAMS==============
    MISSING_PARAMS: '400',
    INVALID_PAGE: '401',
    INVALID_PAGESIZE: '402',
    INVALID_VALID_UNTIL_TIME: '403',
    INVALID_VALUE: '405',
    USER_NOT_EXIST: '406',
    INVALID_PARAMS: '408',
    PROJECT_NOT_EXISTS: '409',
    PROJECT_NAME_EXISTS: '410',
    TRANSACTION_IS_NOT_VALID_TRANSFER_TRX: '412',
    RATE_LIMIT: '413',
    MIN_TRANSFER_AMOUNT: '414',
    ABI_INVALID: '415',
    RECIPIENT_CONTRACT_NOT_EXISTS: '416',
    RECIPIENT_CONTRACT_ALREADY_EXISTS: '417',
    RECIPIENT_CONTRACT_INVALID: '418',
    METHOD_CALLING_IS_NOT_SUPPORT: '419',
    TRANSACTION_IS_NOT_DELEGATE_RESOURCE: '420',
    TRANSACTION_IS_NOT_VALID_DELEGATE_RESOURCE: '421',
    NOT_SUPPORT_PARTIAL_ORDER: '422',
    ORDER_IS_FULLED: '423',
    DELEGATED_FOR_USER_NOT_AVAILABLE: '424',
    FAST_REQUEST: '425',
    SINGEDTX_EXPIRED: '426',
    //==========SERVER==============
    SERVER_MAINTAINED: '501',
    BOT_INSUFFICIENT_BALANCE: '502',
    //==========BUSINESS==============
}

export const getHTTPErrorCode = (e: Error) => {
    const start_message = e.message.substring(0, SERVER_CODE.length + 2)
    switch (start_message) {
        case `${SERVER_CODE}:1`:
            return HTTP_ERROR_CODE.OK_200
        case `${SERVER_CODE}:2`:
            return HTTP_ERROR_CODE.OK_200
        case `${SERVER_CODE}:4`:
            return HTTP_ERROR_CODE.BAD_REQUEST_400
        default:
            return HTTP_ERROR_CODE.OK_200
    }
}

export const getErrorMessage = (error_code: string) => {
    const code_name = `${SERVER_CODE}${error_code}`
    return ErrCodeMessage[code_name]
}

