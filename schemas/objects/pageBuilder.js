import { defineArrayMember, defineField, defineType, useFormValue } from "sanity";
import { BlockElementIcon, InlineElementIcon, StarIcon } from "@sanity/icons";
import { PageBuilderColumnItem } from "../../components";
import { portableTextConfig, stringConfig } from "../../util";

const DEFAULT_NUMBER_OF_COLUMNS = 3;

export default defineType({
	name: "pageBuilder",
	type: "array",
	title: "Page Builder",
	description: "",
	of: [
		defineArrayMember({
			name: "row",
			type: "object",
			title: "Row",
			icon: BlockElementIcon,
			fields: [
				defineField({
					name: "columns",
					type: "array",
					title: "Columns",
					description: "",
					of: [
						defineArrayMember({
							name: "column",
							type: "object",
							title: "Column",
							icon: InlineElementIcon,
							fields: [
								defineField({
									name: "ratio",
									type: "number",
									title: "Ratio",
									description: "",
									initialValue: 1,
									validation: (Rule) => Rule.custom((value) => {
										if (value && value < 0) { return "Must be a positive number"; };
										if (value === 0) { return "Must be greater than zero"; };
										if (!value) { return "Required"; };
										return true;
									}),
								}),
								defineField({
									name: "content",
									type: "multimediaPortableText",
									title: "Content",
									description: "",
								}),
								defineField({
									name: "verticalAlignment",
									type: "verticalAlignment",
									title: "Vertical Alignment",
									description: "",
								}),
							],
							preview: {
								select: {
									content: "content",
								},
								prepare(selection) {
									const { content } = selection;
									return {
										title: portableTextConfig.renderAsPlainText(content),
										subtitle: "Column",
									};
								},
							},
							components: {
								item: PageBuilderColumnItem,
							},
						}),
					],
					initialValue: Array.from({length: DEFAULT_NUMBER_OF_COLUMNS}, () => ({
						_type: "column",
					})),
					// components config
					validation: (Rule) => Rule.required().min(1),
				}),
			],
			preview: {
				select: {
					col0: "columns.[0]",
					col1: "columns.[1]",
					col2: "columns.[2]",
					col3: "columns.[3]",
					col4: "columns.[4]",
					col5: "columns.[5]",
				},
				prepare(selection) {
					const {
						col0,
						col1,
						col2,
						col3,
						col4,
						col5,
					} = selection;
					const colCount = [col0, col1, col2, col3, col4]?.filter(Boolean)?.length;
					return {
						title: colCount + (col5 ? "+" : "") + " " + (colCount === 1 ? "Column" : "Columns"),
						subtitle: "Row",
					};
				},
			},
		}),
	],
	// components config
});