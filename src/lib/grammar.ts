import type {
    Branch,
    Concatenation,
    Constant,
    Content,
    Grammar,
    Separator,
} from "./types";

const nothing = { kind: "nothing" as const };
const branch = (...branches: Content[]): Branch => {
    return { kind: "branch" as const, branches };
};
const maybe = (something: Content) => branch(something, nothing);
const cnst = (constant: string): Constant => {
    return { kind: "constant" as const, constant };
};
const cnstMap = (...constants: string[]): Constant[] => constants.map(cnst);
const cnstBranch = (...constants: string[]): Branch =>
    branch(...cnstMap(...constants));
const cnstMaybe = (constant: string) => maybe(cnst(constant));
const concat = (
    separator: Separator,
    ...content: Content[]
): Concatenation => {
    return {
        kind: "concatenation" as const,
        separator,
        content,
    };
};
const concatSp = (...content: Content[]): Content => concat(" ", ...content);

const currency = cnstBranch("$", "€", "¥");
const amount = {
    kind: "randomNumber" as const,
    min: 15,
    max: 130,
};
const highAmount: Content = concat(
    "",
    currency,
    concatSp(amount, cnstBranch("billion", "million"))
);

const fewUsers: Content = concatSp(
    { kind: "randomNumber" as const, min: 5, max: 40 },
    cnst("users")
);

const authority: Branch = cnstBranch(
    "South Korea",
    "Japan",
    "U.S. SEC",
    "U.S. Government"
);

const project = cnstBranch("Terra", "Bitcoin");
const name = cnstBranch("Do Kwon", "Satoshi Nakamoto");
const founder = concatSp(project, cnst("founder"), name);
const defiName = cnstBranch(
    "Mango Markets",
    "0x",
    "Augur",
    "Bancor",
    "Uniswap",
    "Honeyswap",
    "QANX Bridge"
);
const yachtClub = concatSp(
    cnstBranch("Bored", "Mutant"),
    cnst("Ape"),
    cnstBranch("Kennel", "Yacht"),
    cnst("Club")
);
const nft = branch(yachtClub, ...cnstMap("CryptoPunks"));
const platform = branch(
    concatSp(cnst("DeFi"), defiName),
    concatSp(nft, cnst("NFT"))
);
const exchange = cnstBranch("Bittrex", "Binance", "Coinbase", "Kraken");
const exchangeOrDefi = branch(exchange, defiName);

const thoseEvilDoers = branch(nothing, ...cnstMap("North Korean", "Russian"));
const badActor = concatSp(thoseEvilDoers, cnst("hackers"));
const lab = concatSp(
    cnstBranch("Ethereum", "Yuga", "Prysmatic"),
    cnstBranch("Foundation", "Labs", "Research")
);
const chain = concatSp(
    cnstBranch("Binance", "Ethereum"),
    cnstMaybe("Smart"),
    cnst("Chain")
);

const shortAmount = concatSp(
    cnst("a"),
    cnstBranch("day", "week", "month"),
    cnst("after")
);

const launch = cnstBranch("launch", "release");

// Hackers Drain $100M Off Solana-Based DeFi Platform Mango Markets
const drainage: Content = concatSp(
    badActor,
    cnst("drain"),
    highAmount,
    cnst("off"),
    concat("-", project, cnst("based")),
    platform
);

// Bittrex fined $29 million for sanctions violations
const fined = concatSp(
    exchange,
    cnst("fined"),
    highAmount,
    ...cnstMap("for", "sanctions", "violations")
);

// Mango Markets suffers loss of more than $115 million and counting
const suffersAndCounting = concatSp(
    exchangeOrDefi,
    ...cnstMap("suffers", "loss", "of", "more", "than"),
    highAmount,
    ...cnstMap("and", "counting")
);

// QANX Bridge suffers $1.16 million loss caused by the Profanity vanity address vulnerability
const suffersExploit = concatSp(
    exchangeOrDefi,
    cnst("suffers"),
    highAmount,
    ...cnstMap("loss", "caused", "by", "the"),
    cnstBranch("Profanity vanity address"),
    cnstBranch("exploit", "vulnerability")
);

const exchangeOrDefiOrWallet = branch(
    exchangeOrDefi,
    ...cnstMap(
        "Rabby Wallet",
        "Coinbase Wallet",
        "Metamask Wallet",
        "Trust Wallet",
        "Electrum",
        "BlueWallet"
    )
);

// Rabby Wallet's swap feature exploited a month after launch
const exploitedAfterLaunch = concatSp(
    exchangeOrDefiOrWallet,
    cnstBranch("swap", "staking"),
    ...cnstMap("feature", "exploited"),
    shortAmount,
    launch
);

// U.S. SEC is investigating Bored Apes creator Yuga Labs
const authorityInvestigating = concatSp(
    authority,
    ...cnstMap("is", "investigating"),
    nft,
    cnst("creator"),
    lab
);

const newsAgency = cnstBranch(
    "CoinDesk",
    "Cointelegraph",
    "Yahoo Finance",
    "CoinMarketCap",
    "Financial Times"
);
const cryptoGame = cnstBranch("CryptoKitties", "Decentraland");

const tickerSymbol = concat(
    "",
    cnst("$"),
    cnstBranch("S", "H", "I"),
    cnstBranch("T", "C", "O"),
    cnstBranch("I", "N", "L"),
    maybe(cnstBranch("M", "A", "O"))
);

const reportsThat = concatSp(newsAgency, ...cnstMap("reports", "that"));

// CoinDesk reports that Decentraland has just 38 daily active users
const soFewUsers = concatSp(cryptoGame, ...cnstMap("has", "just"), fewUsers);

// Celsius exposes the names of all customers and their recent transactions in
// court filing – including their execs
const exposes = concatSp(
    exchange,
    ...cnstMap(
        "exposes",
        "the",
        "names",
        "of",
        "all",
        "customers",
        "and",
        "their",
        "recent",
        "transactions",
        "in",
        "court",
        "filing",
        "-",
        "including",
        "their",
        "execs"
    )
);

// Binance Smart Chain halts after $127 million bridge exploit
const halts = concatSp(
    chain,
    ...cnstMap("halts", "after"),
    highAmount,
    ...cnstMap("bridge", "exploit")
);

// South Korea reportedly freezes $39.6 million in crypto belonging to Terra
// founder Do Kwon, Kwon says it isn't his
const freeze: Content = concatSp(
    authority,
    cnst("freezes"),
    highAmount,
    ...cnstMap("in", "crypto", "belonging", "to"),
    founder
);

// $ABC ICO exploited a week after launch
const exploited = concatSp(
    tickerSymbol,
    cnstBranch("ICO", "NFT"),
    ...cnstMap("exploited"),
    shortAmount,
    launch
);

const s = concatSp(
    maybe(reportsThat),
    branch(
        drainage,
        fined,
        suffersAndCounting,
        suffersExploit,
        exploitedAfterLaunch,
        authorityInvestigating,
        soFewUsers,
        exposes,
        halts,
        freeze,
        exploited
    )
);
// const sentence = branch(fined);

export const grammar: Grammar = {
    kind: "sentence",
    sentence: s,
    capitalize: true,
};
