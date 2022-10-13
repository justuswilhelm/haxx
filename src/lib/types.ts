export type Constant = {
    kind: "constant";
    constant: string;
};
export type Branch = {
    kind: "branch";
    branches: Content[];
};

export type Result = string | null;

export type RandomNumber = {
    kind: "randomNumber";
    min: number;
    max: number;
};
export type Nothing = {
    kind: "nothing";
};

// support plural
// evil hacker has / evil hackers have

export type Separator = " " | "" | ", " | "-";
export type Concatenation = {
    kind: "concatenation";
    content: Content[];
    separator: Separator;
};

export type Content =
    | Constant
    | Branch
    | RandomNumber
    | Nothing
    | Concatenation;

export type Sentence = {
    kind: "sentence";
    sentence: Content;
    capitalize: boolean;
};

export type Grammar = Sentence;
